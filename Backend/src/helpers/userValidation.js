"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationSchema = void 0;
const joi_1 = require("joi");
// user_id:string
//     user_name:string
//     user_email:string
//     user_password:string
exports.registrationSchema = joi_1.joi.object({
    user_name: joi_1.joi.string().required().min(5),
    user_email: joi_1.joi.string().email().required(),
    user_password: joi_1.joi.string().pattern(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`))
        .required()
});
