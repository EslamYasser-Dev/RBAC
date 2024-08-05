import { InferInsertModel, } from "drizzle-orm";
import { roles } from "../../db/schema";
import { db } from "../../db";

export async function createRole(data: InferInsertModel<typeof roles>) {
    const result = await db.insert(roles).values(data).returning();
    return result[0];
}

