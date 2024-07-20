import createHttpError from "http-errors";
import { registerUser, findUser } from "../services/auth.js";
import { compareHash } from "../utils/hash.js";
import { createSession, findSession, deleteSession } from "../services/session.js";

const setupResponseSession = (res, { refreshToken, refreshTokenValidUntil, _id }) => {
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: refreshTokenValidUntil,
    });
    res.cookie("sessionId", _id, {
        httpOnly: true,
        expires: refreshTokenValidUntil,
    });
};


export const registerUserController = async (req, res) => {
    const { email } = req.body;
    const userOne = await findUser({ email });
    
    if (userOne ) {
          throw createHttpError(409, "Email is use");
    }
    const user = await registerUser(req.body);
    const data = { 
        name: user.name,
        email: user.email,
    };

    res.json({
        status: 201,
        message: 'Successfully registered a user!',
        data,
    });

};
    

export const loginUserController = async (req, res) => {
    const { email,password } = req.body;
    const user = await findUser({ email });
    
    if (!user ) {
        
        throw createHttpError(404, "Email not found");
    }
    
    const passwordCompare = await compareHash(password, user.password);
    if (!passwordCompare) {
        throw createHttpError(401, "password invalid");
    }

    const session  = await createSession(user._id);
    setupResponseSession(res, session);
    
    res.json({
        status: 200,
        message: "Successfully logged in an user!",
        data: {
            accessToken: session.accessToken,
        }
        
    });

};

export const refreshUserController = async (req, res) => {
    const { refreshToken, sessionId } = req.cookies;
    const currenSession = await findSession({ _id: sessionId, refreshToken });
    
    if (!currenSession) {   
        throw createHttpError(401, "session not found");
    }

    const refreshTokenExpired = new Date() > new Date(currenSession.refreshTokenValidUntil); 

    if (refreshTokenExpired) {
    
        throw createHttpError(401, "session expired");
    }
    const newSession = await createSession(currenSession.userId);
    
    setupResponseSession(res, newSession);
    res.json({
        status: 200,
        message: " user singin successfully",
        data: {
            accessToken: newSession.accessToken,
        }
    });
};

export const singoutController = async (req, res) => {
    const {sessionId} = req.cookies;
    if(!sessionId) {
        throw createHttpError(401, "session not found");
    }


    await deleteSession({ _id: sessionId });
    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");
    res.status(204).send();
};