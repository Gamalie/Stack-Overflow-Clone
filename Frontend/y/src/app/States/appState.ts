import { AnswerReducer } from "./Reducers/answersReducer";
import { CommentReducer } from "./Reducers/commentReducer";
import { QuestionReducer } from "./Reducers/questionReducer";
import { UserReducer } from "./Reducers/usersReducer";


export interface Appstate{
    users:UserReducer,
    question:QuestionReducer,
    answer:AnswerReducer,
    comment:CommentReducer

}