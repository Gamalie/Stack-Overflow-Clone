import { Router } from "express";
import { addQuestion, getQuestionsWithUserAndTags,getQuestionById,updateQuestion,deleteQuestion,adminDeleteQuestion, goToOwnQuestion,goToQuestion} from "../Controllers/questionControllers";
import { tokenVerification } from "../middlewares/verifyTokens";

const questionRoute=Router()

questionRoute.post('',tokenVerification,addQuestion)
questionRoute.get('',tokenVerification,getQuestionsWithUserAndTags)
questionRoute.get('/user',tokenVerification,getQuestionById)
questionRoute.get('/quest/:Id',tokenVerification, goToOwnQuestion)
questionRoute.get('/onequest/:Id',tokenVerification, goToQuestion)
questionRoute.put('/:Id',tokenVerification, updateQuestion)
questionRoute.delete('/:Id',tokenVerification,deleteQuestion)
questionRoute.delete('/admin/:Id',tokenVerification,adminDeleteQuestion)
export default questionRoute