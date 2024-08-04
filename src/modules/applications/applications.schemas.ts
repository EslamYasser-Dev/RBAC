import { z } from "zod";
import zodToJsonSchema from 'zod-to-json-schema';
const createApplicationBodySchema = z.object({
    name: z.string({
        required_error: "name is required",
    })
})

export type createApplicationBody = z.infer<typeof createApplicationBodySchema>

export const createApplicationJsonSchema = {
    body: zodToJsonSchema(createApplicationBodySchema, "createApplicationBodySchema")
}