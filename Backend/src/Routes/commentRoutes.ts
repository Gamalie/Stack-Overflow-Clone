import {addComments,getCommentsOfAnAnswer} from '../Controllers/commentsControllers'
import {Router} from 'express'
import { tokenVerification } from '../middlewares/verifyTokens'


const commentRoute = Router()

commentRoute.post('/:answer_id',tokenVerification,addComments)
commentRoute.get('/:answer_id',tokenVerification,getCommentsOfAnAnswer)

export default commentRoute





