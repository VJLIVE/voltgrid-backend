CREATE TABLE `charging_stations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`latitude` double,
	`longitude` double,
	`status` varchar(50),
	`power_output` int,
	`connector_type` varchar(50),
	`created_by` int,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `charging_stations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`email` varchar(255),
	`password` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
