import fastify from "fastify";
import { logger } from "../utils/logger";
import { applicationsRoutes } from "../modules/applications/applications.routes";

export async function buildServer() {
    const app = fastify({ logger });
    await app.register(applicationsRoutes, { prefix: "/api/v1/applications" });
    return app;
}