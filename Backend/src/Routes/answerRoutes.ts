import { Router } from "express";
import { addAnswer} from "../Controllers/answerControllers";
import { tokenVerification } from "../middlewares/verifyTokens";


const answerRoute=Router()

answerRoute.post('/:user_id',tokenVerification,addAnswer)


export default answerRoute