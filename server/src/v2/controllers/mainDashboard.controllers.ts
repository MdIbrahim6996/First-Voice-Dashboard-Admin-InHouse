import { Request, Response } from "express";
import { prisma } from "../../lib/prismaClient";

type Process = {
    id: number;
    name: string;
};

type Lead = {
    saleDate: Date;
    shift: string;
    process: Process | null;
    leadBy: { alias: string } | null;
};

type GroupedByProcess = {
    [processId: number]: {
        process: Process | null;
        leads: Lead[];
    };
};

function getShift(createdAt: Date): string {
    const date = new Date(createdAt);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const totalMinutes = hours * 60 + minutes;

    // ranges in UTC
    const range1Start = 9 * 60; // 09:00
    const range1End = 12 * 60 + 30; // 12:00

    const range2Start = 12 * 60 + 31; // 12:30
    const range2End = 15 * 60 + 30; // 15:00

    const range3Start = 15 * 60 + 31; // 15:30
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

const getGroupedLeads = async (leads: any[]) => {
    const groupedByProcess = leads.reduce<GroupedByProcess>((acc, lead) => {
        const processId = lead.process?.id ?? 0;

        if (!acc[processId]) {
            acc[processId] = {
                process: lead.process,
                leads: [],
            };
        }

        acc[processId].leads.push(lead);

        return acc;
    }, {});
    return Object.values(groupedByProcess);
};

export const leaderboard = async (req: Request, res: Response) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const leads = await prisma.lead.findMany({
        where: {
            saleDate: {
                gte: start,
                lte: end,
            },
        },
        select: {
            id: true,
            saleDate: true,
            process: {
                select: { id: true, name: true },
            },
            leadBy: {
                select: { id: true, alias: true },
            },
        },
    });

    const leadsWithShift = leads?.map((lead) => ({
        ...lead,
        shift: getShift(lead.saleDate),
    }));

    const finalData = await getGroupedLeads(leadsWithShift);

    res.status(200).json({ success: true, data: finalData });
};

type LeaderboardMap = Record<
    string,
    {
        agent: string;
        count: number;
        latestSale: Date;
    }
>;
export const topSellers = async (req: Request, res: Response) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const leads = await prisma.lead.findMany({
        where: {
            saleDate: {
                gte: start,
                lte: end,
            },
        },
        select: {
            id: true,
            saleDate: true,

            leadBy: {
                select: { id: true, alias: true },
            },
        },
    });

    // const leadsWithAgentName = leads?.map((lead) => ({
    //     ...lead,
    //     agent: lead?.leadBy?.alias,
    // }));

    const leaderboardMap = leads.reduce<LeaderboardMap>((acc, lead) => {
        const agent = lead.leadBy?.alias || "Unknown";
        const saleDate = new Date(lead.saleDate);

        if (!acc[agent]) {
            acc[agent] = {
                agent,
                count: 0,
                latestSale: saleDate,
            };
        }

        acc[agent].count += 1;

        // track latest sale
        if (saleDate > acc[agent].latestSale) {
            acc[agent].latestSale = saleDate;
        }

        return acc;
    }, {});
    const leaderboardArray = Object.values(leaderboardMap);

    leaderboardArray.sort((a, b) => {
        // 1. sort by count DESC
        if (b.count !== a.count) {
            return b.count - a.count;
        }

        // 2. if same count → latest sale ASC
        return a.latestSale.getTime() - b.latestSale.getTime();
    });

    res.status(200).json({ success: true, data: leaderboardArray });
};
