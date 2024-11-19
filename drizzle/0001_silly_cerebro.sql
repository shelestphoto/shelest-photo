CREATE TABLE IF NOT EXISTS "shelest-photo_gallery" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"created_by" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shelest-photo_photos" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"url" varchar(256),
	"gallery_id" integer NOT NULL,
	"created_by" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shelest-photo_gallery" ADD CONSTRAINT "shelest-photo_gallery_created_by_shelest-photo_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."shelest-photo_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shelest-photo_photos" ADD CONSTRAINT "shelest-photo_photos_gallery_id_shelest-photo_gallery_id_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."shelest-photo_gallery"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shelest-photo_photos" ADD CONSTRAINT "shelest-photo_photos_created_by_shelest-photo_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."shelest-photo_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
