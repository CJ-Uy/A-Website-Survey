CREATE TABLE "colors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"response_id" uuid,
	"bg_type" text DEFAULT 'solid' NOT NULL,
	"solid_color" jsonb,
	"gradient_start_color" jsonb,
	"gradient_end_color" jsonb,
	"gradient_degrees" integer,
	"header_own_bg" boolean,
	"header_bg" jsonb,
	"header_text" jsonb,
	"footer_own_bg" boolean,
	"footer_bg" jsonb,
	"card_bg" jsonb,
	"card_text" jsonb,
	"card_border" jsonb,
	"button_next_bg" jsonb,
	"button_next_text" jsonb,
	"button_back_bg" jsonb,
	"button_back_text" jsonb,
	"button_reset_bg" jsonb,
	"button_reset_text" jsonb
);
--> statement-breakpoint
CREATE TABLE "responses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"rating" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sizes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"response_id" uuid,
	"card_width" integer,
	"card_height" integer,
	"card_border_width" integer,
	"card_border_roundness" integer,
	"text_survey_title" integer,
	"text_card_titles" integer,
	"text_subheadings" integer,
	"text_content" integer,
	"button_gap" integer,
	"button_padding" integer,
	"button_text" integer,
	"form_range_slider_height" integer,
	"form_range_slider_width" integer
);
--> statement-breakpoint
CREATE TABLE "statistics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parameter_name" text NOT NULL,
	"total_count" integer DEFAULT 0,
	"sum" real DEFAULT 0,
	"values" json DEFAULT '[]'::json,
	CONSTRAINT "statistics_parameter_name_unique" UNIQUE("parameter_name")
);
--> statement-breakpoint
ALTER TABLE "colors" ADD CONSTRAINT "colors_response_id_responses_id_fk" FOREIGN KEY ("response_id") REFERENCES "public"."responses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sizes" ADD CONSTRAINT "sizes_response_id_responses_id_fk" FOREIGN KEY ("response_id") REFERENCES "public"."responses"("id") ON DELETE cascade ON UPDATE no action;