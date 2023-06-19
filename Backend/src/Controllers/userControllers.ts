import { Request, RequestHandler, Response } from "express";
import mssql from 'mssql'
import { sqlConfig } from "../Config";
import {v4 as uid} from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {registrationSchema} from '../helpers/userValidation'
import dotenv from 'dotenv'
import path from 'path'
import { DatabaseHelper} from '../dbHelpers/index'
import { decodedData } from "../interface";





export interface Users{
    User_id:number,
    Name:string,
    Email:string,
    Password:string,
    Picture:string,
    Username:string,
    Title:string,
    About_me:string,
    Is_delete:number,
    Role:string,
}

export interface ExtendedRequest extends Request{
    body:{
        User_id:number,
        Name:string,
        Email:string,
        Password:string,
    }
    params: {
        User_id:string
    }
    info?:decodedData
}

dotenv.config({path:path.resolve(__dirname,'../../.env')})


export const addUser= async (req:ExtendedRequest,res:Response)=>{

        try {
            let User_id=uid()  //for generating unique id
            const{Name, Email,Password}=req.body 
            //for getting data from req.body
    
            //validation
            const {error}=registrationSchema.validate(req.body)
            console.log(error) 
            if(error){
               return res.status(4000).json(error.details[0].message)
            }
    
            let hashedPassword = await bcrypt.hash(Password,10)
            
            //connect to the database
            const pool= await mssql.connect(sqlConfig)
    
            //make a request
            await pool.request()
            .input("user_id",User_id)
            .input("user_name",Name)
            .input("user_email",Email)
            .input("user_password",hashedPassword)
            .execute("Add_User")
           
    
            return res.status(201).json({message:"User registered successfully"})
        } catch (error:any) {
            return res.status(500).json(error)  
        }
    }


    export const getAllUser:RequestHandler= async (req,res)=>{
        try {
            const pool=await mssql.connect(sqlConfig)
            let user:Users[] = await( await pool.request().execute('Get_All_Users')).recordset
            res.status(200).json(user)
            
        } catch (error:any) {
            return res.status(500).json(error.message)
    
            
        }
    }

    export const getUserById=async(req:Request<{user_id:string}>,res:Response)=>{
        try {
            const {user_id}=req.params
            const pool =  await mssql.connect(sqlConfig)
    
            let user:Users = (await(await  pool.request())
            .input('user_id', user_id)
            .execute('getUserById')).recordset[0]
    
            if(user){
                 return res.status(200).json(user) 
            }
            return res.status(404).json({message:"User Not Found"})
    
        } catch (error:any) {
             return res.status(500).json(error.message)
        }
    }


    export const loginUser=async (req:Request,res:Response)=>{
        try {
            const pool=await mssql.connect(sqlConfig)
            const{Email,Password}=req.body as{Email:string,Password:string}
    
            let user:Users[] =await (await  pool.request()
            .input("user_email",Email)
            .execute('getUserByEmail')).recordset

    
            if(!user[0]){
                return res.status(404).json({message:"User not found"})
    
            }
    
            let validPassword = await bcrypt.compare(Password,user[0].Password)
            if(!validPassword){
                return res.status(404).json({message:"Wrong password"})
    
    
            }
            const payload=user.map(lUser=>{
                const{Password,Is_delete,...rest}=lUser
                return rest
    
            })
            //token generation
            const token=jwt.sign(payload[0],process.env.SECRET_KEY as string, {expiresIn:'72000s'})
            
            const user_id=user[0].User_id
            const role=user[0].Role
            return res.json({message:"You have logged in successfully",token,user_id,role})
            
            
        } catch (error:any) {
             return res.status(500).json(error.message)
            
        }
    }

    export const updateUserProfile= async(req:Request,res:Response)=>{
    try {
        const{Picture, Username,About_me,Email,Title}=req.body   
        const{user_id}=req.params
        // console.log(User_id)
        const pool =  await mssql.connect(sqlConfig)
        console.log(req.body);

        let user:Users =(await  pool.request()
        .input("user_email",Email)
        .execute('getUserByEmail')).recordset[0]

        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }

        await pool.request()
        .input("user_id",user_id)
        .input("picture",Picture)
        .input("username",Username)
        .input("about_me",About_me)
        .input('title',Title)
        .execute('updateProfile')

        return res.status(201).json({message:"User updated successfully"})
        
    } catch (error:any) {
         //server side error
         return res.status(500).json(error.message)
        
    }
}


export const resetPassword = async(req:Request,res:Response)=>{
    try {
   
     const{ Email,Password}=req.body 
     const pool = await mssql.connect(sqlConfig)
   
     let user:Users =(await pool.request()
     .input("user_email",Email)
     .execute('getUserByEmail')).recordset[0]
     console.log(Email);
   
     let hashedPassword= await bcrypt.hash(Password,10)
     if(!user){
   
      return res.status(404).json({message:"User Not Found"})
     }
   
     await pool.request()
   
     .input("user_email",Email)
     .input("user_password",hashedPassword)
     .execute('resetPassword')
   
     return res.status(201).json({message:"User updated successfully"})
   
    } catch (error:any) {
   
     return res.status(500).json(error.message)
   
    }
   
   }


   export const deleteUser=async (req:ExtendedRequest,res:Response)=>{

    try {
        if(req.info && req.info.user_role==='admin'){
        const{User_id}=req.params
        // console.log({user_email})
        const pool =  await mssql.connect(sqlConfig)
        let user:Users []=(await  pool.request()
        .input('user_id', User_id)
        .execute('deleteUser')).recordset
 
        return res.status(200).json({message:"User deleted successfully"})}
  
    } catch (error:any) {
        //server side error
        return res.status(500).json(error.message)
        
    }

}