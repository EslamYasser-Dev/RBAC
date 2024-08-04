CREATE TABLE IF NOT EXISTS "users_to_roles" (
	"applicationId" uuid NOT NULL,
	"rolesId" uuid NOT NULL,
	"usersId" uuid NOT NULL,
	CONSTRAINT "users_to_roles_usersId_rolesId_applicationId_pk" PRIMARY KEY("usersId","rolesId","applicationId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_roles" ADD CONSTRAINT "users_to_roles_applicationId_applications_id_fk" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_roles" ADD CONSTRAINT "users_to_roles_rolesId_roles_applicationId_fk" FOREIGN KEY ("rolesId") REFERENCES "public"."roles"("applicationId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_roles" ADD CONSTRAINT "users_to_roles_usersId_users_applicationId_fk" FOREIGN KEY ("usersId") REFERENCES "public"."users"("applicationId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
