"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express"); //added json for purposes of middleware importing, intervenes a request an continues
// import userRouter from './Routes/userRoutes'
// import productRoute from './Routes/ProductsRoutes'
// import addToCartRoute from './Routes/addToCartRoute'
// import ordersRoute from './Routes/ordersRoute'
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, express_2.json)());
app.use((0, cors_1.default)());
app.use('/User', userRouter);
// app.use('/Products',productRoute)
// app.use('/Cart',addToCartRoute)
// app.use('/Orders',ordersRoute)
app.listen(4000, () => {
    console.log('Server Running');
});
// function cors(): any {
//     throw new Error('Function not implemented.')
// }
//http://localhost:4000/todo
//npm i -g nodemon
//npm init - initialize this as a node working directory
//package.json- has start scripts and lidt of dependencies used in the project
// tsc --init  - creats a ts config file
//all ts code will be in src folder , all Js code will be in dist folder
// package.lock.json -version (first npm i ....)
//node modules -this is where the dowloaded library is stored
//git-ignore (nodemodules-(npm i /npm install) /dist (tsc -w))
// @types/... originally all the libraries were written in Javascript
// we dont have the types
//and to work with typescript we require the types
// @types  to install the types of the libraries and we can now work with typescript fully
