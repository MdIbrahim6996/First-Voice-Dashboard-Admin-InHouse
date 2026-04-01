import { Request, Response, NextFunction } from "express";

export const asyncHandler =
    (fn: Function) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            console.error("🔥 Error:", error); // log full error
            next(error); // pass to global error handler
        }
    };
