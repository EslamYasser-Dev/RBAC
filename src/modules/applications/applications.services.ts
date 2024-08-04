import { InferInsertModel } from "drizzle-orm";
import { db } from "../../db";
import { applications } from "../../db/schema";

export async function createApplication(data: InferInsertModel<typeof applications>) {
    const result = await db.insert(applications).values(data).returning();
    return result[0];
}

export async function getApplication() {
    const result = await db.select({ id: applications.id, name: applications.name, ceartedAt: applications.createdAt }).from(applications);
    return result;
}

