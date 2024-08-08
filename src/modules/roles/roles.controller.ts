import { FastifyReply, FastifyRequest } from "fastify";
import { CreateRoleBody } from "./roles.schemas";
import { createRole } from "./roles.services";

export async function createRolesHandler(req: FastifyRequest<{ Body: CreateRoleBody }>, res: FastifyReply) {
    const user = req.user;
    const applicationId = user.applicationId;
    const { name, permissions } = req.body;

    const role = createRole({ name, permissions, applicationId });
    return role;
}