import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { registerUserController, loginUserController, refreshUserController, singoutController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { userSingupSchema, userSinginSchema } from "../validation/user.js";


const authRouter = Router();

authRouter.post('/auth/register', validateBody(userSingupSchema), ctrlWrapper(registerUserController));
authRouter.post('/auth/login', validateBody(userSinginSchema), ctrlWrapper(loginUserController));
authRouter.post('/auth/refresh', ctrlWrapper(refreshUserController));
authRouter.post('/auth/logout', ctrlWrapper(singoutController));
export default authRouter;