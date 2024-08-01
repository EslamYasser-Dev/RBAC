import fastify from "fastify";
import { logger } from "../utils/logger";
export async function buildServer() {

    const app = fastify({
        logger
    });


    return app;
}