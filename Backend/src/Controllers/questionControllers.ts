//import { Request } from "express"
import {Request,Response} from "express"
import mssql from 'mssql'
import {sqlConfig} from "../Config";
import {v4 as uid} from 'uuid'
import {ExtendedRequest, Questions} from '../interface'
import { DatabaseHelper } from "../dbHelpers";
import { log } from "console";



//ADD QUESTION
export const addQuestion = async (req: Request<{user_id:string}>, res: Response) => {
    try {
      let Id = uid();
      const { Title, Body,Tags} = req.body;
      const { user_id } = req.params; 

      await DatabaseHelper.exec('addQuestion',{Id,user_id,Title,Body})

       Tags.forEach(async (tag: {Tag_id:string; }) => {
      await DatabaseHelper.exec('addQuestionTag',{tag_id:tag.Tag_id,question_id:Id})
       });
  
      return res.status(201).json({ message: "Your question has been submitted" });
    } catch (error: any) {
      return res.status(500).json({message:error.message});
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
export const getQuestionById = async (req: Request<{user_id:string}>, res: Response) => {
  try {
    const { user_id } = req.params; 
    let questions:Questions[]=(await DatabaseHelper.exec('getQuestionsByUserId',{user_id})).recordset[0]
    if(questions)
    {return res.status(200).json(questions)}
    return res.status(404).json({message:"Questions not found"})
    
  } catch (error:any) {
      return res.status(500).json(error.message)
  }
}


//GO TO ONE QUESTION
export const goToOneQuestion = async (req: Request<{user_id:string,question_id:string}>, res: Response) => {
  try {
    const { user_id,question_id } = req.params; 
    let questions:Questions[]=(await DatabaseHelper.exec('goToQuestion',{user_id,question_id})).recordset[0]
    return res.status(200).json(questions)
  } catch (error:any) {
      return res.status(500).json(error.message)
  }
}


//UPDATE A QUESTION
export const updateQuestion = async (req: Request<{user_id:string,question_id:string}>, res: Response) => {
  try {

    const { user_id,question_id } = req.params;
    const {Title, Body,Tags} =req.body 
    await DatabaseHelper.exec('updateQuestion',{Title,Body,question_id,user_id})
    Tags.forEach(async (tag: { Tag_id: string; }) => {
      await DatabaseHelper.exec('updateQuestionTag',{tag_id:tag.Tag_id,question_id:question_id})})

    return res.status(200).json({message:'Question updated'})
  } catch (error:any) {
      return res.status(500).json(error.message)
  }
}


//DELETE QUESTION
export const deleteQuestion = async (req: Request<{user_id:string,question_id:string}>, res: Response) => {
  try {

    const { user_id,question_id } = req.params; 
    let questions:Questions[]=(await DatabaseHelper.exec('goToQuestion',{user_id,question_id})).recordset[0]
 
    await DatabaseHelper.exec('deleteQuestion',{question_id,user_id})

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
      let question:Questions[]=(await  pool.request()
      .input('question_id', Id)
      .execute('adminDeleteQuestion')).recordset

      if(!question){
        return res.status(404).json({message:'Question already deleted'})
      }

      return res.status(200).json({message:"Question deleted successfully"})}

  } catch (error:any) {
      //server side error
      return res.status(500).json(error.message)
      
  }
}
