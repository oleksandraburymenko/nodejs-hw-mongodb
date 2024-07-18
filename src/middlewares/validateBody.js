import createHttpError from "http-errors";

export const validateBody = schema => {
    const func = async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, {
                abortEarly: false,
            });
            next();
        } catch (err) {
            const responseError = createHttpError(404, err.message, {
                errors: err.details,
            });
            next(responseError);
        }
    
    };
    return func;
};