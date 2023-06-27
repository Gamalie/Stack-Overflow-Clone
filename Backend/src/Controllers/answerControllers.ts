import {Request,Response} from "express"
import mssql from 'mssql'
import {sqlConfig} from "../Config";
import {v4 as uid} from 'uuid'
import {Answer, ExtendedRequest} from '../interface'
import { DatabaseHelper } from "../dbHelpers";



// ADD ANSWER
export const addAnswer = async (req: ExtendedRequest, res: Response) => {

    try {
  
      let Answer_id = uid();
      const {Title, Body} = req.body;
      const User_id  = req.info?.User_id as string
      const {Question_id} = req.params; 

      await DatabaseHelper.exec('addAnswer',{Answer_id,question_id:Question_id,Title,Body,user_id:User_id})
  
      return res.status(201).json({ message: "Your answer has been submitted" });
    } catch (error: any) {
      return res.status(500).json({message:error.message});
    }
  
  };


  //GET ANSWERS TO A QUESTION
  export const getAnswerByQuestionId = async (req: Request<{question_id:string}>, res: Response) => {
    try {
      const {question_id} = req.params; 
     let answer =  (await DatabaseHelper.exec('getAnswerByQuestionId',{question_id})).recordset
      return res.status(200).json(answer);
    } catch (error: any) {
      return res.status(500).json({message:error.message});
    }
  
  };


  // acceptAnswerAsMostSuitable

export const acceptAnswerAsMostSuitable = async (req:Request<{answer_id:string}>, res:Response) =>{
  try{
    const {answer_id} = req.params
    // let answer = 
    await (DatabaseHelper.exec('acceptedAnswer',{answer_id}))
    return res.status(200).json({message:'Answer marked as most preferred'})
  }
  catch (error:any){
    return res.status(500).json({message:error.message});
  }
}

export const upvoteAnswer= async(req:Request<{answer_id:string}>,res:Response)=>{
  try{
  const {answer_id} = req.params
  await (DatabaseHelper.exec('upvoteAnswer',{answer_id}))
  return res.status(200).json({message:'You have upvoted this answer'})
}
catch (error:any){
  return res.status(500).json({message:error.message});
}
}



//DOWNVOTE ANSWER
export const downVoteAnswer= async(req:Request<{answer_id:string}>,res:Response)=>{
  try{
  const {answer_id} = req.params
  await (DatabaseHelper.exec('downVoteAnswer',{answer_id}))
  return res.status(200).json({message:'You have downvoted this answer'})
}
catch (error:any){
  return res.status(500).json({message:error.message});
}
}
