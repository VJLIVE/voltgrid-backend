ALTER TABLE `charging_stations` ADD `address` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `role` varchar(20) DEFAULT 'driver';--> statement-breakpoint
ALTER TABLE `charging_stations` ADD CONSTRAINT `charging_stations_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;