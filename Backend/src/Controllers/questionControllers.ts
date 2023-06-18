//import { Request } from "express"
import {Request,Response} from "express"
import mssql from 'mssql'
import {sqlConfig} from "../Config";
import {v4 as uid} from 'uuid'
import {Questions} from '../interface'
import { DatabaseHelper } from "../dbHelpers";

interface decodedData{
    user_id:string
    user_name:string;
    user_email:string;
    user_role:string
}
interface ExtendedRequest extends Request{
    body:{
        Title:string
        Body:string
    }
    info?:decodedData
    params:{
        Id:string
       }
}

//ADD QUESTION
export const addQuestion = async (req: Request<{user_id:string}>, res: Response) => {

    try {
      let Id = uid();
      const { Title, Body ,Tags} = req.body;
      const { user_id } = req.params; 

      await DatabaseHelper.exec('addQuestion',{Id,user_id,Title,Body})
       Tags.forEach(async (tag: { Tag_id: string; }) => {
  
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
    return res.status(200).json(questions)
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
    await DatabaseHelper.exec('deleteQuestion',{question_id,user_id})
    return res.status(200).json({message:'question deleted'})
  }

  catch (error:any) {
    return res.status(500).json(error.message)
}
}

