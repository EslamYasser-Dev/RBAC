import { pgTable, primaryKey, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

export const applications = pgTable("applications", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    UpdatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    applicationId: uuid("applicationId").references(() => applications.id),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    UpdatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (users) => {
    return {
        pk: primaryKey({ columns: [users.email, users.applicationId] }),
        idIndex: uniqueIndex('users_id_index').on(users.id),
    }
});

export const roles = pgTable("roles", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 256 }).notNull(),
    applicationId: uuid("applicationId").references(() => applications.id),
    permissions: text("permissions").array().$type<Array<string>>(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    UpdatedAt: timestamp('updated_at').defaultNow().notNull()
}, (roles) => {
    return {
        pk: primaryKey({ columns: [roles.name, roles.applicationId] }),
        idIndex: uniqueIndex('roles_id_index').on(roles.id)
    }
});

export const usersToRoles = pgTable("users_to_roles", {
    applicationsId: uuid("applicationId").references(() => applications.id).notNull(),
    rolesId: uuid("rolesId").references(() => roles.applicationId).notNull(),
    usersId: uuid("usersId").references(() => users.applicationId).notNull()
},
    (usersToRoles) => {
        return {
            pk: primaryKey({ columns: [usersToRoles.usersId, usersToRoles.rolesId, usersToRoles.applicationsId] })
        }
    }
)

