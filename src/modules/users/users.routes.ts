import { FastifyInstance } from "fastify";
import { assignRoleToUserBody, assignRoleToUserJsonSchema, createUserJsonSchema, loginJsonSchema } from "./users.schemas";
import { assignRoleToUserHandler, createUserHandler, loginHandler } from "./users.controller";
import { PERMISSIONS } from "../../config/permissions";

export async function usersRoutes(app: FastifyInstance) {
    app.post("/", { schema: createUserJsonSchema }, createUserHandler);
    app.post("/login", { schema: loginJsonSchema }, loginHandler);
    app.post<{ Body: assignRoleToUserBody }>("/roles", { schema: assignRoleToUserJsonSchema, preHandler: [app.guard.scope(PERMISSIONS["users:roles:write"])] }, assignRoleToUserHandler);
}