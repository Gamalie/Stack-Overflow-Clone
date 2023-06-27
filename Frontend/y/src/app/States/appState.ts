import { QuestionReducer } from "./Reducers/questionReducer";
import { UserReducer } from "./Reducers/usersReducer";


export interface Appstate{
    users:UserReducer,
    question:QuestionReducer

}