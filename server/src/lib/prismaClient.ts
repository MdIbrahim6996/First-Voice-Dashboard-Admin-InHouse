import { PrismaClient } from "@prisma/client";

// export const prisma = new PrismaClient();

declare global {
    // allow global `var` declarations
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

export const prisma =
    global.prisma ||
    new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL + "?connection_limit=2",
            },
        },
    });

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}
