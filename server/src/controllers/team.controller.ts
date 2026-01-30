import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import { Prisma } from "@prisma/client";

export const createTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, managerId, members } = req.body;
        const team = await prisma.team.create({
            data: {
                name,
                managerId,
                members: {
                    connect: members.map((id: string) => ({
                        id: Number(id),
                    })),
                },
            },
        });
        res.send(team);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getAllTeams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const team = await prisma.team.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                manager: { select: { alias: true } },
                // members: { select: { alias: true } },
            },
        });
        res.send(team);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getSingleTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    try {
        const team = await prisma.team.findUnique({
            where: { id: parseInt(id) },
            include: {
                manager: { select: { alias: true } },
                members: { select: { alias: true } },
            },
        });
        res.send(team);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const updateTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const { name, managerId, members } = req.body;

    try {
        const team = await prisma.team.update({
            where: { id: parseInt(id) },
            data: {
                name: name ? name : Prisma.skip,
                managerId: managerId ? managerId : Prisma.skip,
                members: members ? members : Prisma.skip,
            },
        });
        res.send(team);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const deleteTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    try {
        const team = await prisma.team.delete({
            where: { id: parseInt(id) },
        });
        res.send(team);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
