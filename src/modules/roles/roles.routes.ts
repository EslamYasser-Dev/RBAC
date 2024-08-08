import { FastifyInstance } from "fastify";
import { CreateRoleBody, createRolesJsonSchema } from "./roles.schemas";
import { createRolesHandler } from "./roles.controller";
import { PERMISSIONS } from "../../config/permissions";

export async function rolesRoutes(app: FastifyInstance) {
    app.post<{ Body: CreateRoleBody }>('/',
        {
            schema: createRolesJsonSchema,
            preHandler: [app.guard.scope([PERMISSIONS["roles:write"]])]
        },
        createRolesHandler)
}