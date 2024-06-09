ALTER TABLE "accounts" ADD COLUMN "account_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN IF EXISTS "first_name";--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN IF EXISTS "last_name";--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN IF EXISTS "phone";--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN IF EXISTS "email_address";