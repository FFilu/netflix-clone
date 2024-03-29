import { PrismaClient } from "@prisma/client";


/**
 * The Prisma client instance.
 */
const client = global.prismadb || new PrismaClient();  

if (process.env.NODE_ENV !== "production") {
    global.prismadb = client;
}

export default client;