import {Request,Response} from "express"
import mssql from 'mssql'
import {sqlConfig} from "../Config";
import {v4 as uid} from 'uuid'
import {Answer} from '../interface'
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


// ADD ANSWER
export const addAnswer = async (req: Request<{user_id:string}>, res: Response) => {

    try {
  
      let Answer_id = uid();
      const {Title, Body} = req.body;
      const { user_id } = req.params; 

      await DatabaseHelper.exec('addAnswer',{Answer_id,user_id,Title,Body})
  
      return res.status(201).json({ message: "Your answer has been submitted" });
    } catch (error: any) {
      return res.status(500).json({message:error.message});
    }
  
  };

// // //GET ALL QUESTION
// export const getQuestionsWithUserAndTags = async(req:Request,res:Response)=>{
//         try {
//             const pool =await mssql.connect(sqlConfig)
//             let answer:Answer[]=(await pool.request().execute('getQuestionsWithUserAndTags')).recordset
//             console.log(questions);
            
//             return res.status(200).json(questions)
//         } catch (error:any) {
//             return res.status(500).json(error.message)
//         }
// }


// //GET QUESTION BY USER ID
// export const getQuestionById = async (req: Request<{user_id:string}>, res: Response) => {
//   try {
//     const { user_id } = req.params; 
//     let questions:Questions[]=(await DatabaseHelper.exec('getQuestionsByUserId',{user_id})).recordset[0]
//     return res.status(200).json(questions)
//   } catch (error:any) {
//       return res.status(500).json(error.message)
//   }
// }


// //GO TO ONE QUESTION
// export const goToOneQuestion = async (req: Request<{user_id:string,question_id:string}>, res: Response) => {
//   try {
//     const { user_id,question_id } = req.params; 
//     let questions:Questions[]=(await DatabaseHelper.exec('goToQuestion',{user_id,question_id})).recordset[0]
//     console.log(questions);
//     return res.status(200).json(questions)
//   } catch (error:any) {
//       return res.status(500).json(error.message)
//   }
// }