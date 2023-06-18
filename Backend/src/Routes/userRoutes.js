"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../Controllers/userControllers");
const userRouter = (0, express_1.Router)();
userRouter.post('', userControllers_1.addUser);
exports.default = userRouter;
