import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

export const application = - pgTable("applications", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    UpdatedAt: timestamp('Updated_at').defaultNow().notNull(),
    

})