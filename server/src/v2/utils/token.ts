import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./appConstants";

export type JwtPayload = {
    id: string;
    role: string;
};

export const generateAuthToken = (payload: JwtPayload) => {
    return jwt.sign(payload, JWT_SECRET!, { expiresIn: "24h" });
};

export const verifyAuthToken = (token: string): JwtPayload => {
    return jwt.verify(token, JWT_SECRET!) as JwtPayload;
};
