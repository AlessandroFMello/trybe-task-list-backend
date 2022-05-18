CREATE DATABASE  IF NOT EXISTS `TRYBE_TASK_LIST` ;
USE `TRYBE_TASK_LIST`;
DROP TABLE IF EXISTS `task_list`;

CREATE TABLE `task_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

INSERT INTO `task_list` VALUES
  (1,'Arrumar a cama'),(2,'Passar Café'),(3,'Escovar os dentes'),
  (4,'Corrida matinal'),(5,'Preparar almoço');
