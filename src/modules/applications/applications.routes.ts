import { FastifyInstance } from "fastify";
import { createApplicationHandler } from "./applications.controller";
import { createApplicationJsonSchema } from "./applications.schemas";
import { getApplication } from "./applications.services";

export async function applicationsRoutes(app: FastifyInstance) {
    app.post('/', { schema: createApplicationJsonSchema }, createApplicationHandler);
    app.get('/', {}, () => { });
}