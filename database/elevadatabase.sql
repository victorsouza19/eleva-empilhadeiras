CREATE DATABASE  IF NOT EXISTS `elevaempilhadeiras` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `elevaempilhadeiras`;

-- Table structure for table `addresses`

DROP TABLE IF EXISTS `addresses`;

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `street` varchar(100) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `cep` varchar(20) DEFAULT NULL,
  `complement` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
);


-- Table structure for table `customers`

DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `adress_id` int(11) DEFAULT NULL,
  `identify` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `my_fk` (`adress_id`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`adress_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `customers_ibfk_2` FOREIGN KEY (`adress_id`) REFERENCES `addresses` (`id`)
);


-- Table structure for table `equipments`

DROP TABLE IF EXISTS `equipments`;

CREATE TABLE `equipments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `manufacturer` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `provider` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
);


-- Table structure for table `orders`

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `responsible` varchar(50) DEFAULT NULL,
  `initial_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `status` varchar(15) NOT NULL,
  `type` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
);


-- Table structure for table `orders_equipments`

DROP TABLE IF EXISTS `orders_equipments`;

CREATE TABLE `orders_equipments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `equipment_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `equipment_id` (`equipment_id`),
  KEY `orders_id` (`order_id`),
  CONSTRAINT `orders_equipments_ibfk_1` FOREIGN KEY (`equipment_id`) REFERENCES `equipments` (`id`),
  CONSTRAINT `orders_equipments_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
);

-- Table structure for table `users`

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
