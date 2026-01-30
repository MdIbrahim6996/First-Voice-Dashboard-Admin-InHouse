import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import bcrypt from "bcrypt";
import superjson from "superjson";
import { Prisma } from "@prisma/client";
import { returnRandomQuotes } from "../utils/appConstants";
import { graphData } from "../utils/arrayGrouping";
import { groupBy } from "lodash";
import { cache } from "../lib/cache";
import { getMonthStartAndEnd } from "../utils/date";

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            name,
            alias,
            email,
            employeeId,
            phone,
            password,
            block,
            role,
            process,
        } = req.body;
        console.log(req.body);

        const existingUser = await prisma.user.findFirst({ where: { email } });
        if (existingUser) {
            throw new Error("User With This Email Already Exist.");
        }

        const existingUserwithEmployeeId = await prisma.user.findFirst({
            where: { employeeId },
        });
        if (existingUserwithEmployeeId) {
            throw new Error("User With This Employee ID Already Exist.");
        }

        const existingUserwithAlias = await prisma.user.findFirst({
            where: { alias },
        });
        if (existingUserwithAlias) {
            throw new Error("User With This Alias Already Exist.");
        }
        // console.log(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name: name.toUpperCase(),
                email,
                password: hashedPassword,
                employeeId,
                phone,
                role,
                isBlocked: block === "false" ? false : true,
                alias: alias.toUpperCase(),
                processId: parseInt(process),
            },
        });
        res.send(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getAllUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name } = req.query as { name?: string };
    const search = typeof name === "string" ? name.trim() : null;

    try {
        const users = await prisma.user.findMany({
            where: name
                ? {
                      alias: {
                          contains: name.toUpperCase(),
                      },
                  }
                : Prisma.skip,
            orderBy: { createdAt: "desc" },
            include: { process: { select: { name: true } } },
        });
        res.send(users);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getAllCloser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name } = req.query as { name?: string };
    const search = typeof name === "string" ? name.trim() : null;

    try {
        const users = await prisma.user.findMany({
            where: {
                alias: name
                    ? {
                          contains: name.toUpperCase(),
                      }
                    : Prisma.skip,
                role: { in: ["closer", "verifier"] },
            },
            orderBy: { createdAt: "desc" },
            include: { process: { select: { name: true } } },
        });
        res.send(users);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getAllOldUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await prisma.old_users.findMany({
            orderBy: { created_at: "desc" },
        });
        res.send(superjson.stringify(users));
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getSingleUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const user = await prisma.user.findFirst({ where: { id: parseInt(id) } });
    res.send(user);
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    console.log("body", req.body.block!!);
    const {
        name,
        alias,
        email,
        employeeId,
        phone,
        password,
        block,
        role,
        process,
    } = req.body;
    try {
        const existingUser = await prisma.user.findFirst({
            where: { id: parseInt(id) },
        });
        if (!existingUser) {
            throw new Error("User Doesn't Exist.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                name,
                email,
                password: password ? hashedPassword : Prisma.skip,
                employeeId,
                phone,
                role,
                isBlocked: +block === 1 ? true : false,
                alias,
                processId: process ? parseInt(process) : Prisma.skip,
            },
            include: { process: { select: { name: true } } },
        });
        res.send(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.delete({ where: { id: parseInt(id) } });
        res.send(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getProfileCardInfo = async (
    userId: number,
    month: number,
    year: number
) => {
    const currentStartDay = new Date();
    currentStartDay.setUTCHours(0, 0, 0, 0);

    const nextStartDay = new Date();
    nextStartDay.setDate(nextStartDay.getDate() + 1);
    nextStartDay.setUTCHours(0, 0, 0, 0);

    const currentStartMonth = new Date();
    currentStartMonth.setDate(1);
    currentStartMonth.setMonth(currentStartMonth.getMonth() - 1); //change it later , this line was not here.

    currentStartMonth.setUTCHours(0, 0, 0, 0);

    const nextStartMonth = new Date();
    nextStartMonth.setMonth(nextStartMonth.getMonth()); //change it later ,this line was +1
    nextStartMonth.setDate(1);
    nextStartMonth.setUTCHours(0, 0, 0, 0);

    const startDate = getMonthStartAndEnd(Number(month), Number(year)).start;
    const endDate = getMonthStartAndEnd(Number(month), Number(year)).nextStart;

    const todayLead = await prisma.lead.count({
        where: {
            leadByUserId: userId,
            saleDate: { gte: currentStartDay, lte: nextStartDay },
        },
    });
    const totalLead = await prisma.lead.count({
        where: {
            leadByUserId: userId,
            saleDate: { gte: new Date(startDate), lte: new Date(endDate) },
        },
    });
    const totalSuccessLead = await prisma.lead.count({
        where: {
            leadByUserId: userId,
            status: { name: "success" },
            saleDate: { gte: new Date(startDate), lte: new Date(endDate) },
        },
    });
    const totalAttendance = await prisma.attendance.count({
        where: {
            userId,
            dateTime: { gte: new Date(startDate), lte: new Date(endDate) },
        },
    });
    let spd;
    if (totalAttendance > 0) spd = totalSuccessLead / totalAttendance;

    return {
        todayLead: todayLead > 9 ? todayLead : "0" + todayLead,
        totalSuccessLead:
            totalSuccessLead > 9 ? totalSuccessLead : "0" + totalSuccessLead,
        totalLead: totalLead > 9 ? totalLead : "0" + totalLead,
        spd: spd ? spd?.toFixed(2) : 0,
        totalAttendance:
            totalAttendance > 9 ? totalAttendance : "0" + totalAttendance,
    };
};

const getPieChartInfo = async (
    userId: number,
    time = "thisMonth",
    month: number,
    year: number
) => {
    const filterDate: {
        startDate: Date;
        endDate: Date;
    } = {
        startDate: new Date(),
        endDate: new Date(),
    };
    const currentDate = new Date();

    const startDate = getMonthStartAndEnd(Number(month), Number(year)).start;
    const endDate = getMonthStartAndEnd(Number(month), Number(year)).nextStart;

    if (time === "today") {
        const startDay = currentDate.setUTCHours(0, 0, 0, 0);
        const nextDay = new Date(
            currentDate.setDate(currentDate.getDate() + 1)
        ).setUTCHours(0, 0, 0, 0);
        console.log(new Date(nextDay));

        filterDate.startDate = new Date(startDay);
        filterDate.endDate = new Date(nextDay);
    }

    if (time === "thisMonth") {
        const startMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            2
        ).setUTCHours(0, 0, 0);
        const endMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            2
        ).setUTCHours(0, 0, 0);
        filterDate.startDate = new Date(startMonth);
        filterDate.endDate = new Date(endMonth);
    }

    if (time === "thisYear") {
        const startYear = new Date();
        startYear.setMonth(0);
        startYear.setDate(1);
        startYear.setUTCHours(0, 0, 0, 0);

        const endYear = new Date();
        endYear.setFullYear(endYear.getFullYear() + 1);
        endYear.setMonth(0);
        endYear.setDate(1);
        endYear.setUTCHours(0, 0, 0, 0);

        filterDate.startDate = new Date(startYear);
        filterDate.endDate = new Date(endYear);
    }
    const status = await prisma.status.findMany({});

    const result = status.map(async (item: any) => {
        const data = await prisma.lead.groupBy({
            by: ["statusId"],
            where: {
                leadByUserId: userId,
                statusId: item?.id,
                saleDate: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            _count: { _all: true },
        });
        const count = data[0]?._count?._all;
        return {
            status: item?.name,
            count: count ? count : 0,
        };
    });

    // const user = await prisma.lead.groupBy({
    //     by: ["statusId"],
    //     where: { closerId: parseInt(userId), statusId: 1 },
    //     _count: { _all: true },
    // });

    return await Promise.all(result);
};

export const getUserInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id: userId } = req.params;
    const { year, month } = req.query;

    try {
        const user = await prisma.user.findFirst({
            where: { id: parseInt(userId as string) },
        });

        if (!user) throw new Error("User doesn't exist.");

        const cacheKey = `userprofile_${userId}`;

        // if (cache.has(cacheKey)) {
        //     const profileData: any = cache.get(cacheKey);

        //     return res.send({
        //         currentPath: "/user/profile",
        //         ...profileData,
        //         quote: returnRandomQuotes(),
        //     });
        // }

        const userAttendance = await prisma.attendance.findMany({
            where: { userId: parseInt(userId as string) },
            orderBy: { dateTime: "desc" },
        });
        const grouped = groupBy(userAttendance, (record) =>
            record.dateTime.toISOString().slice(5, 7)
        );
        // cache.set(
        //     cacheKey,
        //     {
        //         data: grouped,
        //         graphData: graphData(grouped),
        //         cardInfo: await getProfileCardInfo(
        //             parseInt(userId as string),
        //             Number(month),
        //             Number(year)
        //         ),
        //         pieChart: await getPieChartInfo(parseInt(userId as string)),
        //     },
        //     1000 * 60 * 60
        // );

        res.send({
            data: grouped,
            graphData: graphData(grouped),
            cardInfo: await getProfileCardInfo(
                parseInt(userId as string),
                Number(month),
                Number(year)
            ),
            pieChart: await getPieChartInfo(
                parseInt(userId as string),
                "thisMonth",
                Number(month),
                Number(year)
            ),
            quote: returnRandomQuotes(),
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getUserYearlyAttendance = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    const attenance = await prisma.attendance.findMany({
        where: { userId: parseInt(id) },
        orderBy: { dateTime: "desc" },
    });
    res.send(attenance);
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getUserYearlyLeads = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    const leads = await prisma.lead.findMany({
        where: { leadByUserId: parseInt(id) },
        include: { status: true },
        orderBy: { saleDate: "desc" },
    });
    res.send(leads);
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getUserYearlyLeadsClosed = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    const leads = await prisma.lead.findMany({
        where: { closerId: parseInt(id) },
        select: {
            status: true,
            leadBy: { select: { alias: true } },
            id: true,
            createdAt: true,
        },
        orderBy: { saleDate: "desc" },
    });
    res.send(leads);
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const getUserYearlyLeadsVerified = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    const leads = await prisma.lead.findMany({
        where: { verifierId: parseInt(id) },
        select: {
            status: true,
            leadBy: { select: { alias: true } },
            id: true,
            createdAt: true,
        },
        orderBy: { saleDate: "desc" },
    });
    res.send(leads);
    try {
    } catch (error) {
        console.log(error);
        next(error);
    }
};
