CREATE TABLE `animations` (
	`id` text PRIMARY KEY NOT NULL,
	`response_id` text,
	`enabled` integer DEFAULT false,
	`transition_duration` integer,
	`transition_timing` text,
	`hover_scale` real,
	`hover_shadow` integer DEFAULT false,
	`hover_color_shift` integer DEFAULT false,
	`page_transitions` text,
	FOREIGN KEY (`response_id`) REFERENCES `responses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `borders` (
	`id` text PRIMARY KEY NOT NULL,
	`response_id` text,
	`divider_style` text,
	`divider_color` text,
	`divider_thickness` integer,
	`section_gap` integer,
	FOREIGN KEY (`response_id`) REFERENCES `responses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `colors` (
	`id` text PRIMARY KEY NOT NULL,
	`response_id` text,
	`bg_type` text DEFAULT 'solid' NOT NULL,
	`solid_color` text,
	`gradient_start_color` text,
	`gradient_end_color` text,
	`gradient_degrees` integer,
	`header_own_bg` integer,
	`header_bg` text,
	`header_text` text,
	`footer_own_bg` integer,
	`footer_bg` text,
	`card_bg` text,
	`card_text` text,
	`card_border` text,
	`button_next_bg` text,
	`button_next_text` text,
	`button_back_bg` text,
	`button_back_text` text,
	`button_reset_bg` text,
	`button_reset_text` text,
	FOREIGN KEY (`response_id`) REFERENCES `responses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `dark_mode` (
	`id` text PRIMARY KEY NOT NULL,
	`response_id` text,
	`preference` text,
	`dark_shade` text,
	`dark_accent_color` text,
	FOREIGN KEY (`response_id`) REFERENCES `responses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `form_styling` (
	`id` text PRIMARY KEY NOT NULL,
	`response_id` text,
	`input_border_style` text,
	`focus_ring_color` text,
	`placeholder_color` text,
	`input_border_radius` integer,
	`checkbox_style` text,
	FOREIGN KEY (`response_id`) REFERENCES `responses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `layout` (
	`id` text PRIMARY KEY NOT NULL,
	`response_id` text,
	`max_width` integer,
	`content_padding` integer,
	`element_spacing` integer,
	`alignment` text,
	FOREIGN KEY (`response_id`) REFERENCES `responses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` text PRIMARY KEY NOT NULL,
	`response_id` text,
	`image_border_radius` integer,
	`image_aspect_ratio` text,
	`media_style` text,
	`show_placeholders` integer DEFAULT true,
	FOREIGN KEY (`response_id`) REFERENCES `responses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `navigation` (
	`id` text PRIMARY KEY NOT NULL,
	`response_id` text,
	`position` text,
	`sticky` integer,
	`mobile_style` text,
	`transparency` integer,
	FOREIGN KEY (`response_id`) REFERENCES `responses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `responses` (
	`id` text PRIMARY KEY NOT NULL,
	`rating` integer,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `shadows` (
	`id` text PRIMARY KEY NOT NULL,
	`response_id` text,
	`card_shadow_enabled` integer DEFAULT false,
	`card_shadow_x` integer,
	`card_shadow_y` integer,
	`card_shadow_blur` integer,
	`card_shadow_spread` integer,
	`card_shadow_color` text,
	`button_shadow` integer DEFAULT false,
	`elevation_level` text,
	FOREIGN KEY (`response_id`) REFERENCES `responses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `sizes` (
	`id` text PRIMARY KEY NOT NULL,
	`response_id` text,
	`card_width` integer,
	`card_height` integer,
	`card_border_width` integer,
	`card_border_roundness` integer,
	`text_survey_title` integer,
	`text_card_titles` integer,
	`text_subheadings` integer,
	`text_content` integer,
	`button_gap` integer,
	`button_padding` integer,
	`button_text` integer,
	`form_range_slider_height` integer,
	`form_range_slider_width` integer,
	FOREIGN KEY (`response_id`) REFERENCES `responses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `spacing` (
	`id` text PRIMARY KEY NOT NULL,
	`response_id` text,
	`density` text,
	`paragraph_gap` integer,
	`section_spacing` integer,
	`inner_padding` integer,
	FOREIGN KEY (`response_id`) REFERENCES `responses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `statistics` (
	`id` text PRIMARY KEY NOT NULL,
	`parameter_name` text NOT NULL,
	`total_count` integer DEFAULT 0,
	`sum` real DEFAULT 0,
	`values` text DEFAULT '[]'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `statistics_parameter_name_unique` ON `statistics` (`parameter_name`);--> statement-breakpoint
CREATE TABLE `typography` (
	`id` text PRIMARY KEY NOT NULL,
	`response_id` text,
	`font_family` text,
	`heading_font` text,
	`body_font` text,
	`font_weight` integer,
	`line_height` real,
	`letter_spacing` real,
	FOREIGN KEY (`response_id`) REFERENCES `responses`(`id`) ON UPDATE no action ON DELETE cascade
);
