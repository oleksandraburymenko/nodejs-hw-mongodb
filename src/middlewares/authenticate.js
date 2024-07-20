import createHttpError from "http-errors";
import { findSession } from "../services/session.js";
import { findUser } from "../services/auth.js";


export const authenticate = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    
    if (!authHeader) {
        return next(createHttpError(401, "Authorization header missing"));
    }

    const [bearer, accessToken] = authHeader.split(" ");
    
    if (bearer !== "Bearer") {
        return next(createHttpError(401, "Bearer missing"));
    }

    if (!accessToken) {
        return next(createHttpError(401, "token missing"));
    }

    const session = await findSession({ accessToken });

    if (!session) {
        return next(createHttpError(401, "session not found"));
    }

    const accessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);
    
    if (accessTokenExpired) {
                return next(createHttpError(401, "Access token expired"));
    }

    const user = await findUser({ _id: session.userId });
    
    if (!user) {
        return next(createHttpError(401, "user not found"));
    }
    req.user = user;
    next();
};