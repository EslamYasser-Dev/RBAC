import fastify from "fastify";
import { logger } from "../utils/logger";
import guard from "fastify-guard";
import { applicationsRoutes } from "../modules/applications/applications.routes";
import { usersRoutes } from "../modules/users/users.routes";
import { rolesRoutes } from "../modules/roles/roles.routes";
import jwt from "jsonwebtoken";



type User = {
    id: string,
    scopes: Array<string>,
    applicationId: string
}

declare module 'fastify' {
    interface FastifyRequest {
        user: User
    }
}

export async function buildServer() {
    const app = fastify({ logger });
    app.decorate('user', null)
    app.addHook('onRequest', async function (request, reply) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return;
        }
        try {
            const token = authHeader.replace('Bearer', "");
            const decoded = jwt.verify(token, 'secret') as User;
            request.user = decoded;

        } catch (error) {

        }
    })
    await app.register(guard,
        {
            requestProperty: "user",
            scopeProperty: "scopes",
            errorHandler: (result, request, reply) => {
                return reply.send("you cannot do that")
            }
        }
    )
    await app.register(applicationsRoutes, { prefix: "/api/v1/applications" });
    await app.register(usersRoutes, { prefix: "/api/v1/users" });
    await app.register(rolesRoutes, { prefix: "/api/v1/roles" });
    return app;
}