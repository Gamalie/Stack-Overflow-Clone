import { Router } from "express";
import {addUser,getAllUser,getUserById, loginUser} from "../Controllers/userControllers";
// ,getAllUser,getUserByEmail,updateUser,deleteUser,loginUser, resetPassword
import { tokenVerification } from "../middlewares/verifyTokens";

const userRouter= Router()


userRouter.post('',addUser)
userRouter.get('',getAllUser)
userRouter.get('/:user_id',getUserById)
userRouter.post('/login',loginUser)


export default userRouter