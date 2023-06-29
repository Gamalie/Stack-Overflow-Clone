import { Request, RequestHandler, Response } from "express";


export interface Users{
    User_id:string,
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


export interface NewUsers{
    Name:string,
    Email:string,
    Password:string
}

export interface LogInuser{
    Email:string
    Password:string
 
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
        Id:string,
    
    }
    
}


export interface Questions{
    User_id:string,
    Id:string,
    Title:string,
    Body:string,
    Tags:[]
    Is_deleted:number
    
}

export interface Tag{
    TagBody:string
}



export interface Answer{
    QuestionId:string,
    Answer_id:string,
    Body:string,
    Votes:number,
    Title:string

}


export interface decodedData{
    User_id:string
    Name:string;
    Email:string;
    Role:string
}

export interface UpdateProfile{
    Picture:string,
    Username:string,
    Title:string,
    About_me:string,
}

export interface AddedQuestionSuccess{
    message:string
}

export interface AddedAnswerSuccess{
    message:string
}

export interface AddedCommentSuccess{
    message:string
}

export interface UpdateQuestionSuccess{
    message:string
}

export interface UpdateProfileSuccess{
    message:string
}

export interface AddedUserSuccess{
    message:string
}

export interface DeleteUserSuccess{
    message:string
}

export interface DeletedQuestionSuccess{
    message:string
}

export interface AcceptsAnswerSuccess{
    message:string
}

export interface UpvoteAnswerSuccess{
    message:string
}

export interface DownvoteAnswerSuccess{
    message:string
}

export interface LoggedInUserSuccess{
    message:string,
    token:string,
    User_id:string
    Role:string
}

export interface UserProfile{
    Picture:string,
    Username:string,
    Title:string,
    About_me:string
}

export interface c{
    message:string
}

export interface Comment{
    Comments_id:string
    Body:string
    Is_deleted:string
    Answer_id:string
}





