import { Router } from "express";
import { addQuestion, getQuestionsWithUserAndTags,getQuestionById,goToOneQuestion,updateQuestion,deleteQuestion,adminDeleteQuestion} from "../Controllers/questionControllers";
import { tokenVerification } from "../middlewares/verifyTokens";

const questionRoute=Router()

questionRoute.post('/:user_id',tokenVerification,addQuestion)
questionRoute.get('',tokenVerification,getQuestionsWithUserAndTags)
questionRoute.get('/:user_id',tokenVerification,getQuestionById)
questionRoute.get('/:user_id/:question_id',tokenVerification, goToOneQuestion)
questionRoute.put('/:user_id/:question_id',tokenVerification, updateQuestion)
questionRoute.delete('/:user_id/:question_id',tokenVerification,deleteQuestion)
questionRoute.delete('/admin/:Id',tokenVerification,adminDeleteQuestion)
export default questionRoute