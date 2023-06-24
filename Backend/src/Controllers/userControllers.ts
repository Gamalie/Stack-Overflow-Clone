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
import { ExtendedRequest, Users, decodedData } from "../interface";



dotenv.config({path:path.resolve(__dirname,'../../.env')})


export const addUser= async (req:ExtendedRequest,res:Response)=>{

        try {
            let User_id=uid()  
            const{Name, Email,Password}=req.body
            const {error}=registrationSchema.validate(req.body)
            console.log(error)

            if(error){
               return res.status(4000).json(error.details[0].message)
            }
            let hashedPassword = await bcrypt.hash(Password,10)
            
            const pool= await mssql.connect(sqlConfig)

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
            let PageNumber = 1
            const pool=await mssql.connect(sqlConfig)
            let user:Users[] = await( await pool.request().input('PageNumber',PageNumber).execute('Get_All_Users')).recordset
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
            return res.status(404).json({message:"User not found"})
    
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

            const token=jwt.sign(payload[0],process.env.SECRET_KEY as string, {expiresIn:'72000s'})
            
            const user_id=user[0].User_id
            const user_role=user[0].Role
           
            
            return res.json({message:"You have logged in successfully",token,user_id,user_role})
            
            
        } catch (error:any) {
             return res.status(500).json(error.message)
            
        }
    }

    export const updateUserProfile= async(req:Request,res:Response)=>{
    try {
        const{Picture, Username,About_me,Email,Title}=req.body   
        const{user_id}=req.params
       
        const pool =  await mssql.connect(sqlConfig)
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

        return res.status(200).json({message:"User profile updated successfully"})
        
    } catch (error:any) {
       
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


  
export const adminDeleteUser=async (req:ExtendedRequest,res:Response)=>{
    try {
        console.log(req.info?.Role)
        if(req.info && req.info.Role==='admin'){
        const{User_id}=req.params
       
        const pool =  await mssql.connect(sqlConfig)
        let user:Users[]=(await  pool.request()
        .input('user_id', User_id)
        .execute('deleteUser')).recordset
  
        if(!user){
          return res.status(404).json({message:'User already deleted'})
        }
  
        return res.status(200).json({message:"User deleted successfully"})}
  
    } catch (error:any) {
        
        return res.status(500).json(error.message)
        
    }
  }