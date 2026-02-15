CREATE TABLE `users_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`password` text NOT NULL,
	`email` varchar(255) NOT NULL,
	`role` enum('admin','applicant','employer') DEFAULT 'applicant',
	`phone_number` varchar(255),
	`deleted_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_table_username_unique` UNIQUE(`username`),
	CONSTRAINT `users_table_email_unique` UNIQUE(`email`)
);
