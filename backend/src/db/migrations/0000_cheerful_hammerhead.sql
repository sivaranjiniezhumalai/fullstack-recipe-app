CREATE TABLE "favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"recipe_id" integer NOT NULL,
	"recipe_name" text NOT NULL,
	"image" text,
	"cook_time" integer,
	"servings" integer,
	"created_at" timestamp DEFAULT now()
);
