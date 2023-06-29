//User Interface

import { Request, RequestHandler, Response } from "express";


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
        Role:string,
        Title:string,
        Body:string,
        Tags:string[]
    }
    info?:decodedData
    params: {
        Id:string,
        Question_id:string
        User_id:string
    }
    
}


export interface Questions{
    User_id:number,
    Id:number,
    Title:string,
    Body:string,
    Is_deleted:number
    
}

export interface Tag{
    Tag_id: number
    Tag_name: string
}


export interface Answer{
    QuestionId:number,
    AnswerId:number,
    Body:string,
    Vote:number
}


export interface decodedData{
    User_id:string
    Name:string;
    Email:string;
    Role:string
}

export interface Comment{
    Comments_id:string
    Answer_id:string
    Body:string
    Is_deleted:string
   
}