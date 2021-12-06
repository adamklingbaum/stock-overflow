USE `stocks`;

DROP TABLE IF EXISTS `prices`;

CREATE TABLE `prices` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `security_id` INTEGER NULL DEFAULT NULL,
  `date` DATE NOT NULL,
  `price` DOUBLE NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE `prices` ADD FOREIGN KEY (security_id) REFERENCES `securities` (`id`);