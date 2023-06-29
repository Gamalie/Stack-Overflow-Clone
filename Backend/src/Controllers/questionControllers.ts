//import { Request } from "express"
import {Request,Response} from "express"
import mssql from 'mssql'
import {sqlConfig} from "../Config";
import {v4 as uid} from 'uuid'
import {ExtendedRequest, Questions} from '../interface'
import { DatabaseHelper } from "../dbHelpers";
import { log } from "console";



//ADD QUESTION
export const addQuestion = async (req:ExtendedRequest, res: Response) => {
    try {
      let Id = uid();
      const { Title, Body,Tags} = req.body;
      const User_id  = req.info?.User_id as string

      await DatabaseHelper.exec('addQuestion',{Id,User_id,Title,Body})

       Tags.forEach(async (tag) => {
      const tag_id = uid()
      await DatabaseHelper.exec('addTags',{tag_id:tag_id,tag_name:tag})
      console.log(Id,tag_id);
      
      await DatabaseHelper.exec('addQuestionTag',{question_id:Id,tag_id:tag_id})
       });
  
      return res.status(201).json({ message: "Your question has been submitted" });
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  
  };



// //GET ALL QUESTION
export const getQuestionsWithUserAndTags = async(req:Request,res:Response)=>{
        try {
            const pool =await mssql.connect(sqlConfig)
            let questions:Questions[]=(await pool.request().execute('getQuestionsWithUserAndTags')).recordset
            
            return res.status(200).json(questions)
        } catch (error:any) {
            return res.status(500).json(error.message)
        }
}


//GET QUESTION BY USER ID
export const getQuestionById = async (req:ExtendedRequest, res: Response) => {
  try {
    const  User_id  = req.info?.User_id as string; 
    let questions:Questions[]=(await DatabaseHelper.exec('getQuestionsByUserId',{User_id})).recordset
    console.log(questions)
    if(questions)
    {return res.status(200).json(questions)}
    return res.status(404).json({message:"Questions not found"})
    
  } catch (error:any) {
      return res.status(500).json(error.message)
  }
}


//GO TO ONE QUESTION
export const goToOwnQuestion = async (req: ExtendedRequest, res: Response) => {
  try {
    const User_id = req.info?.User_id as string
    const { Id } = req.params 
    console.log(Id)
    let questions:Questions[]=await(await DatabaseHelper.exec('goToOneQuestion',{question_id:Id})).recordset[0]
    console.log(questions)
    return res.status(200).json(questions)
  } catch (error:any) {
      return res.status(500).json(error.message)
  }
}


//GoToOneQuestions

export const goToQuestion = async (req:Request<{Id:string}>,res:Response)=>{
  try {
    const { Id } = req.params 
    console.log(Id)
    let questions:Questions[]=(await DatabaseHelper.exec('goToOneQuestion',{question_id:Id})).recordset[0]
    return res.status(200).json(questions)
  } catch (error:any) {
      return res.status(500).json(error.message)
  }
}


//UPDATE A QUESTION
export const updateQuestion = async (req: ExtendedRequest, res: Response) => {
  try {

    const User_id = req.info?.User_id as string
    const { Id } = req.params; 
    const {Title, Body,Tags} =req.body 
    await DatabaseHelper.exec('updateQuestion',{Title,Body,question_id:Id,User_id})
    Tags.forEach(async (tag) => {
      const tag_id = uid()
      await DatabaseHelper.exec('addTags',{tag_id:tag_id,tag_name:tag})
      console.log(Id,tag_id);
      
      await DatabaseHelper.exec('addQuestionTag',{question_id:Id,tag_id:tag_id})
       })

    return res.status(200).json({message:'Question updated'})
  } catch (error:any) {
      return res.status(500).json(error.message)
  }
}


//DELETE QUESTION
export const deleteQuestion = async (req:ExtendedRequest , res: Response) => {
  try {

    const User_id = req.info?.User_id as string
    const {Id } = req.params; 
    let questions:Questions[]=(await DatabaseHelper.exec('goToQuestion',{User_id,question_id:Id})).recordset[0]
 
    await DatabaseHelper.exec('deleteQuestion',{User_id,question_id:Id})

    if(!questions){
      return res.status(404).json({message:'Question already deleted'})
    }


    return res.status(200).json({message:'question deleted'})
  }

  catch (error:any) {
    return res.status(500).json(error.message)
}
}


export const adminDeleteQuestion=async (req:ExtendedRequest,res:Response)=>{
  try {
      if(req.info && req.info.Role==='admin'){
      const{Id}=req.params //Question Id
     
      const pool =  await mssql.connect(sqlConfig)
      let question=(await  pool.request()
      .input('question_id', Id)
      .execute('adminDeleteQuestion'))
      // console.log(question);
      

      return res.status(200).json({message:"Question deleted successfully"})}

  } catch (error:any) {
      //server side error
      return res.status(500).json(error.message)
      
  }
}
