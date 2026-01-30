import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";

export const getTopSellers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const currentDay = new Date();
    currentDay.setUTCHours(0, 0, 0, 0);

    const nextDay = new Date();
    nextDay.setUTCHours(0, 0, 0, 0);
    nextDay.setUTCDate(nextDay.getUTCDate() + 1);
    try {
        const seller = await prisma.leadCount.findMany({
            where: {
                updatedAt: { gte: currentDay, lte: nextDay },
                userId: { not: null },
                count: { gt: 0 },
            },
            orderBy: [{ count: "desc" }, { updatedAt: "asc" }],
            include: { user: { select: { name: true, alias: true } } },
        });
        res.send(seller);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

function getTimeCategory(createdAt: Date): string {
    const date = new Date(createdAt);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const totalMinutes = hours * 60 + minutes;

    // ranges in UTC
    const range1Start = 9 * 60; // 09:00
    const range1End = 12 * 60; // 12:00

    const range2Start = 12 * 60 + 30; // 12:30
    const range2End = 15 * 60; // 15:00

    const range3Start = 15 * 60 + 30; // 15:30
    const range3End = 18 * 60; // 18:00

    if (totalMinutes >= range1Start && totalMinutes <= range1End) {
        return "first"; //09:00 – 12:00;
    } else if (totalMinutes >= range2Start && totalMinutes <= range2End) {
        return "second"; //12:30 – 15:00;
    } else if (totalMinutes >= range3Start && totalMinutes <= range3End) {
        return "third"; //15:30 – 18:00;
    } else {
        return "Other";
    }
}

export const getProcessLeadCount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    const date2 = new Date();
    date2.setUTCDate(date.getDate() + 1);
    date2.setUTCHours(0, 0, 0, 0);

    try {
        const leadCount = await prisma.process.findMany({
            include: {
                User: {
                    // orderBy: { LeadCount: { _count: "desc" } },

                    omit: {
                        email: true,
                        employeeId: true,
                        phone: true,
                        createdAt: true,
                        isBlocked: true,
                        password: true,
                        updatedAt: true,
                        processId: true,
                    },
                    include: {
                        LeadCount: {
                            select: { count: true },
                            where: { createdAt: { gte: date, lte: date2 } },
                        },
                    },
                },
            },
        });

        const leads = await prisma.lead.findMany({
            select: {
                id: true,
                createdAt: true,
                leadBy: { select: { alias: true } },
            },
        });
        // console.log(leads)

        const grouped = leads.reduce((acc: any, lead) => {
            const cat = getTimeCategory(new Date(lead.createdAt));
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(lead);
            return acc;
        }, {});

        res.send(leadCount);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getDailySales = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // const date = new Date();
    // date.setUTCHours(0, 0, 0, 0);
    // const date2 = new Date();
    // date2.setUTCDate(date.getDate() + 1);
    // date2.setUTCHours(0, 0, 0, 0);

    const currentDay = new Date();
    currentDay.setUTCHours(0, 0, 0, 0);

    const nextDay = new Date();
    nextDay.setUTCHours(0, 0, 0, 0);
    nextDay.setUTCDate(nextDay.getUTCDate() + 1);

    try {
        const leads = await prisma.lead.findMany({
            select: {
                id: true,
                processId: true,
                createdAt: true,
                leadBy: { select: { alias: true, id: true } },
            },
            where: {
                processId: { not: null },
                createdAt: { gte: currentDay, lte: nextDay },
            },
        });

        const grouped = leads.reduce((acc, lead) => {
            const { processId, createdAt, leadBy } = lead;
            const id = leadBy?.id;

            const date = new Date(createdAt);
            const hours = date.getUTCHours();
            const minutes = date.getUTCMinutes();
            const totalMinutes = hours * 60 + minutes;

            // ranges in UTC
            const range1Start = 9 * 60; // 09:00
            const range1End = 12 * 60; // 12:00

            const range2Start = 12 * 60 + 30; // 12:30
            const range2End = 15 * 60; // 15:00

            const range3Start = 15 * 60 + 30; // 15:30
            const range3End = 18 * 60; // 18:00

            // determine half
            let half;
            if (totalMinutes >= range1Start && totalMinutes <= range1End) {
                half = "firstHalf";
            } else if (
                totalMinutes >= range2Start &&
                totalMinutes <= range2End
            ) {
                half = "secondHalf";
            } else if (
                totalMinutes >= range3Start &&
                totalMinutes <= range3End
            ) {
                half = "thirdHalf";
            } else {
                half = "other"; // optional, in case leads are outside these times
            }
            // @ts-ignore
            if (!acc[processId]) acc[processId] = {};
            // @ts-ignore
            if (!acc[processId][half]) acc[processId][half] = [];

            // find if lead already exists in the array
            // @ts-ignore
            const existing = acc[processId][half].find(
                (l: any) => l?.leadBy?.id === id
            );

            if (existing) {
                existing.count = (existing.count || 1) + 1;
            } else {
                // @ts-ignore
                acc[processId][half].push({ ...lead, count: 1 });
            }

            // @ts-ignore
            // acc[processId][half].push(lead);
            return acc;
        }, {});

        res.send(grouped);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
