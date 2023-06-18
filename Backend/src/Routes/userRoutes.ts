import { Router } from "express";
import {addUser,getAllUser,getUserById, loginUser,updateUserProfile,resetPassword,deleteUser} from "../Controllers/userControllers";
import { tokenVerification } from "../middlewares/verifyTokens";

const userRouter= Router()


userRouter.post('',addUser)
userRouter.get('',getAllUser)
userRouter.get('/:user_id',getUserById)
userRouter.post('/login',loginUser)
userRouter.put('/:user_id',tokenVerification,updateUserProfile)
userRouter.put('/rsp/:user_id',tokenVerification,resetPassword)
userRouter.delete('/:user_id',deleteUser)


export default userRouter