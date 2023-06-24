import { Router } from "express";
import { addAnswer, getAnswerByQuestionId,acceptAnswerAsMostSuitable,upvoteAnswer,downVoteAnswer} from "../Controllers/answerControllers";
import { tokenVerification } from "../middlewares/verifyTokens";


const answerRoute=Router()

answerRoute.post('/:user_id/:question_id',tokenVerification,addAnswer)
answerRoute.get('/:question_id',tokenVerification,getAnswerByQuestionId)
answerRoute.put('/:answer_id',tokenVerification,acceptAnswerAsMostSuitable)
answerRoute.put('/upvote/:answer_id',tokenVerification,upvoteAnswer)
answerRoute.put('/downvote/:answer_id',tokenVerification,downVoteAnswer)


export default answerRoute