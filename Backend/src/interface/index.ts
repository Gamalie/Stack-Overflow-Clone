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
        Role:string
    }
    info?:decodedData
    params: {
        User_id:string,
        Id:string
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
    TagBody:string
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


