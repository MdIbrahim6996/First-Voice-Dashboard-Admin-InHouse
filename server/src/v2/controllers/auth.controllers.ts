import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { token, user } = await authService.loginUser(email, password);

    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production
        // sameSite: "lax",
        maxAge: 12 * 60 * 60 * 1000,
    })
        .status(200)
        .json({
            success: true,
            data: user,
        });
};

export const logout = async (req: Request, res: Response) => {
    res.clearCookie("token");

    res.status(200).json({
        success: true,
        message: "Logout successful",
    });
};
