import { FastifyInstance } from "fastify";
import { createApplicationHandler } from "./applications.controller";
import { createApplicationJsonSchema } from "./applications.schemas";

export async function applicationsRoutes(app: FastifyInstance) {
    app.post('/', { schema: createApplicationJsonSchema }, createApplicationHandler);
    app.get('/', () => { });
}