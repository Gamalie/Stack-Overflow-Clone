import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
import { decodedData } from "../interface";

dotenv.config({path:path.resolve(__dirname,'../../.env')})


interface ExtendedRequest extends Request{
    info?:decodedData
}


export const tokenVerification= (req:ExtendedRequest,res:Response,next:NextFunction)=>{
    try {
        const token=req.headers['token'] as string
        if(!token){
            return res.status(401).json({message:'Unauthorized'})
        }
        const decodedData=jwt.verify(token,process.env.SECRET_KEY as string) as decodedData
        req.info=decodedData
        console.log(req.info);
        

    } catch (error:any) {
        return res.status(403).json({message:error.message})
        
    }
    next()
}