import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserBody, LoginBody } from "./users.schemas";
import { SYSTEM_ROLES } from "../../config/permissions";
import { getRoleByName } from "../roles/roles.services";
import { assignRoleToUser, createUser, getUserByApplicationId, getUserByEmail } from "./users.services";
import jwt from "jsonwebtoken";

//create new
export async function createUserHandler(req: FastifyRequest<{ Body: CreateUserBody }>, res: FastifyReply) {
    const { initialUser, ...data } = req.body;
    const roleName = initialUser ? SYSTEM_ROLES.SUPER_ADMIN : SYSTEM_ROLES.APPLICATION_USER;
    const role = await getRoleByName({ name: roleName, applicationId: data.applicationId });

    if (roleName === SYSTEM_ROLES.SUPER_ADMIN) {
        const appUsers = await getUserByApplicationId(data.applicationId);
        if (appUsers.length > 0) {
            return res.code(400).send({
                message: "Application already has super admin user",
                extensions: {
                    code: "APPLICATION_ALREADY_SUPER_ADMIN",
                    applicationId: data.applicationId
                }
            })
        }
        if (!role) {
            return res.code(404).send({
                message: "Role does not exist"
            });
        }
    }
    try {
        const user = await createUser(data);
        await assignRoleToUser({
            userId: user.id, roleId: role.id, applicationId: data.applicationId
        })
        return user;
    } catch (error) {
        console.error(error);
    }
}

//login
export async function loginHandler(req: FastifyRequest<{
    Body: LoginBody
}>, res: FastifyReply) {
    const { applicationId, email, password } = req.body;

    const user = await getUserByEmail({ applicationId, email });

    if (!user) { return res.code(400).send({ message: "something wrong" }); }
    const token = jwt.sign({ id: user.id, email, applicationId, scopes: user.permissions }, "secret1541");

    return { token };
}