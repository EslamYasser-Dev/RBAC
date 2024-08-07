import { and, eq, InferInsertModel } from "drizzle-orm";
import { roles, users, usersToRoles } from "../../db/schema";
import argon2 from "argon2";
import { db } from "../../db";
import { set } from "zod";

export async function createUser(data: InferInsertModel<typeof users>) {
    const hashedPassword = argon2.hash(data.password);
    const val: any = { ...data, password: hashedPassword };
    const result = await db.insert(users).values(val).returning({
        id: users.id,
        name: users.name,
        email: users.email,
        applicationId: users.applicationId
    });
    return result[0];
}

export async function getUserByApplicationId(applicationId: string) {
    const result = await db.select().from(users).where(eq(users.applicationId, applicationId));
    return result;
}

export async function assignRoleToUser(data: InferInsertModel<typeof usersToRoles>) {
    const result = await db.insert(usersToRoles).values(data).returning();
    return result[0];
}

export async function getUserByEmail({ email, applicationId }: { email: string, applicationId: string }) {
    const result = await db.select({
        id: users.id,
        email: users.email,
        name: users.name,
        applicationId: users.applicationId,
        roles: roles.id,
        password: users.password,
        permissions: roles.permissions
    }).from(users).
        where(and(eq(users.email, email), eq(users.applicationId, applicationId)))
        .leftJoin(
            usersToRoles,
            and(
                eq(usersToRoles.applicationId, users.applicationId),
                eq(usersToRoles.userId, users.id)
            )
        ).leftJoin(roles,
            eq(usersToRoles.roleId, roles.id)
        )
    if (!result.length) return null;

    const user = result.reduce((acc, curr) => {
        if (!acc.id) {
            return { ...curr, permissions: new Set(curr.permissions) };
        }
        if (!curr.permissions) {
            return acc;
        }

        for (const permission of curr.permissions) {
            acc.permissions.add(permission);
        }

        return acc;
    }, {} as Omit<(typeof result)[number], 'permissions'> & { permissions: Set<string> })
    return { ...user, permissions: Array.from(user.permissions) };
}

