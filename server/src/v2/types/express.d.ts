import "express";
import { User } from "./app.types";

declare global {
    namespace Express {
        interface Request {
            user?: User | null;
        }
    }
}

export {};
