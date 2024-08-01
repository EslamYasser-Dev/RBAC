import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { env } from "./config/env";
import { logger } from "./utils/logger";
import { buildServer } from "./utils/server";
import { db } from './db';

async function shutDownServer({
    app,
}: { app: Awaited<ReturnType<typeof buildServer>> }) {
    await app.close();
}


async function main() {
    const app = await buildServer();
    app.listen({ port: env.PORT, host: env.HOST });
    await migrate(db, {
        migrationsFolder: "./migrations",
    });
    //log for closing server
    const signals = ['SIGINT', 'SIGTREM'];
    logger.debug(env);
    for (const signal of signals) {
        process.on(signal, () => {
            shutDownServer({ app })
        })
    }
}

main();