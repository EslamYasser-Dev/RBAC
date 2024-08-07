import fastify from "fastify";
import { logger } from "../utils/logger";
import { applicationsRoutes } from "../modules/applications/applications.routes";
import { usersRoutes } from "../modules/users/users.routes";

export async function buildServer() {
    const app = fastify({ logger });
    await app.register(applicationsRoutes, { prefix: "/api/v1/applications" });
    await app.register(usersRoutes, { prefix: "/api/v1/users" });
    return app;
}