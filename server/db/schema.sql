-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'portfolios'
--
-- ---

DROP DATABASE IF EXISTS `stocks`;
CREATE DATABASE `stocks`;
USE `stocks`;

DROP TABLE IF EXISTS `portfolios`;

CREATE TABLE `portfolios` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` MEDIUMTEXT NULL DEFAULT NULL,
  `inception_date` DATE NOT NULL,
  `starting_cash` INTEGER NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'stock_txs'
--
-- ---

DROP TABLE IF EXISTS `stock_txs`;

CREATE TABLE `stock_txs` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `type` VARCHAR(4) NULL DEFAULT NULL,
  `security_id` INTEGER NULL DEFAULT NULL,
  `units` INTEGER NULL DEFAULT NULL,
  `price` DOUBLE NULL DEFAULT NULL,
  `portfolio_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'securities'
--
-- ---

DROP TABLE IF EXISTS `securities`;

CREATE TABLE `securities` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` MEDIUMTEXT NULL DEFAULT NULL,
  `symbol` VARCHAR(5) NULL DEFAULT NULL,
  `sector` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'cash_txs'
--
-- ---

DROP TABLE IF EXISTS `cash_txs`;

CREATE TABLE `cash_txs` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `amount` DOUBLE NULL DEFAULT NULL,
  `portfolio_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `prices`;

CREATE TABLE `prices` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `security_id` INTEGER NULL DEFAULT NULL,
  `date` DATE NOT NULL,
  `price` DOUBLE NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);


-- ---
-- Foreign Keys
-- ---

ALTER TABLE `stock_txs` ADD FOREIGN KEY (security_id) REFERENCES `securities` (`id`);
ALTER TABLE `stock_txs` ADD FOREIGN KEY (portfolio_id) REFERENCES `portfolios` (`id`);
ALTER TABLE `cash_txs` ADD FOREIGN KEY (portfolio_id) REFERENCES `portfolios` (`id`);
ALTER TABLE `prices` ADD FOREIGN KEY (security_id) REFERENCES `securities` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `portfolios` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `stock_txs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `securities` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `cash_txs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `portfolios` (`id`,`name`,`inception_date`,`starting_cash`) VALUES
-- ('','','','');
-- INSERT INTO `stock_txs` (`id`,`date`,`type`,`security_id`,`units`,`price`,`portfolio_id`) VALUES
-- ('','','','','','','');
-- INSERT INTO `securities` (`id`,`name`,`symbol`,`sector`) VALUES
-- ('','','','');
-- INSERT INTO `cash_txs` (`id`,`amount`,`portfolio_id`) VALUES
-- ('','','');

LOAD DATA LOCAL INFILE 'sp500.csv'
INTO TABLE `securities`
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(@col1, @col2, @col3) set name=@col2,symbol=@col1,sector=@col3;