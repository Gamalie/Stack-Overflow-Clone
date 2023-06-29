import {Request,Response} from "express"
import {v4 as uid} from 'uuid'
import { DatabaseHelper } from "../dbHelpers";


export const addComments = async (req:Request<{answer_id:string}>,res:Response)=>{
    let comment_id = uid ()
    const {answer_id} = req.params
    const {Body}= req.body
    try{
        await DatabaseHelper.exec('addComment',{Comment_id:comment_id,Answer_id:answer_id,Body})
        console.log(Body)
        return res.status(200).json({message:'You Commented on this answer'})
    }
    catch (error:any){

    }
}



export const getCommentsOfAnAnswer = async (req:Request<{answer_id:string}>,res:Response)=>{
    const {answer_id} = req.params
    try{
        let comments = (await DatabaseHelper.exec('getCommentsOfAnAnswer',{answer_id})).recordset
        console.log(comments);
        
        return res.status(200).json(comments)
    }
    catch (error:any){

    }
}