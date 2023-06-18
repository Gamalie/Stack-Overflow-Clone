"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const Config_1 = require("../Config");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userValidation_1 = require("../helpers/userValidation");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let User_id = (0, uuid_1.v4)(); //for generating unique id
        const { Name, Email, Password } = req.body; //for getting data from req.body
        //validation
        const { error } = userValidation_1.registrationSchema.validate(req.body);
        if (error) {
            return res.status(4000).json(error.details[0].message);
        }
        let hashedPassword = yield bcrypt_1.default.hash(Password, 10);
        //connect to the database
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        //make a request
        yield pool.request()
            .input("user_id", User_id)
            .input("user_name", Name)
            .input("user_email", Email)
            .input("user_password", hashedPassword)
            .execute("Add_User");
        return res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: 'Your details did not follow the given pattern' });
    }
});
exports.addUser = addUser;