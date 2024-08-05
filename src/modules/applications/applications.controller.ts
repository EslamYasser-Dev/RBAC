import { FastifyReply, FastifyRequest } from "fastify";
import { createApplicationBody } from "./applications.schemas";
import { createApplication } from "./applications.services";
import { createRole } from "../roles/roles.services";
import { ALL_PERMISSIONS, SYSTEM_ROLES, USER_ROLES_PERMISSIONS } from "../../config/permissions";

export async function createApplicationHandler(req: FastifyRequest<{ Body: createApplicationBody }>, res: FastifyReply) {
    const { name } = req.body;
    const application = await createApplication({
        name
    });


    const superAdminRolePromise = createRole({
        applicationId: application.id,
        name: SYSTEM_ROLES.SUPER_ADMIN,
        permissions: ALL_PERMISSIONS as unknown as Array<string>

    });

    const applicationUserRolePromise = createRole({
        applicationId: application.id,
        name: SYSTEM_ROLES.APPLICATION_USER,
        permissions: USER_ROLES_PERMISSIONS
    });

    const [superAdminRole, applicationUserRole] = await Promise.allSettled([
        superAdminRolePromise,
        applicationUserRolePromise
    ])


    return { application, superAdminRole, applicationUserRole };
}