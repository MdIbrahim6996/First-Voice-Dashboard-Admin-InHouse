import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./appConstants";

//Paste secret key from .env
export const generateAuthToken = (id: string, role: string) => {
    return jwt.sign({ id, role }, JWT_SECRET!, { expiresIn: "24h" });
};
