import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import { Prisma } from "@prisma/client";

export const getAppliances = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { leadId } = req.params;
    try {
        const appliance = await prisma.appliance.findMany({
            where: { leadId: parseInt(String(leadId)) },
            orderBy: { createdAt: "desc" },
        });
        res.send(appliance);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getAppliancePerPage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { leadIds } = req.body;
    try {
        const appliance = await prisma.appliance.findMany({
            where: { leadId: { in: leadIds } },
            orderBy: { createdAt: "desc" },
        });
        res.send(appliance);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const updateAppliance = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const { name, makeOfAppliance, age } = req.body;
    try {
        const appliance = await prisma.appliance.update({
            where: { id: parseInt(String(id)) },
            data: {
                name: name ? name : Prisma.skip,
                makeOfAppliance: makeOfAppliance
                    ? makeOfAppliance
                    : Prisma.skip,
                age: age ? parseInt(age) : Prisma.skip,
                leadId: Prisma.skip,
            },
        });
        // console.log(req.body);
        res.send(appliance);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const deleteAppliance = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    // console.log("appl", id);
    try {
        const appliance = await prisma.appliance.delete({
            where: { id: parseInt(String(id)) },
        });
        res.send(appliance);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
