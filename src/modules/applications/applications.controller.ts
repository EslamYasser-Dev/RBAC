import { FastifyReply, FastifyRequest } from "fastify";
import { createApplicationBody } from "./applications.schemas";
import { createApplication } from "./applications.services";

export async function createApplicationHandler(req: FastifyRequest<{ Body: createApplicationBody }>, res: FastifyReply) {
    const { name } = req.body;
    const application = await createApplication({
        name
    });
    return { application };
}