CREATE DATABASE  IF NOT EXISTS `chanom` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `chanom`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: chanom
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `aID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `pass_word` varchar(50) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `birthdate` date NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`aID`,`username`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (1,'Kritchanapat','Earthza007','Kritchanapat','Junju','2003-05-26','kritchanapat.jun@student.mahidol.edu'),(2,'Thitiwut','Bosszahahaha55566','Thitiwut','Harnphatcharapanukorn','2003-04-08','thitiwutharn@gmail.com'),(3,'Sirasit','himzaza','Sirasit','Puangpathanachai','2003-01-18','sirasit.pun@student.mahidol.edu'),(4,'thanawat','aritsulynn','Thanawat','Jarusuthirug','2002-02-27','sirasit.pun@student.mahidol.edu'),(5,'bhubodin','songzaba','Bhubodin','Somwhang','2002-02-27','bhubodin.som@student.mahidol.edu'),(6,'ict','ict555','ict','user','2009-05-20','ict@mahidol.ac.th'),(7,'Anababa','abc1234','Anna','Robertson','1998-04-06','anna.rob@hotmail.com'),(8,'AnaWooo','DDAisReal55','Anna','Dupont','1995-06-08','anna.dup@hotmail.com');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `pID` int NOT NULL AUTO_INCREMENT,
  `pName` varchar(50) NOT NULL,
  `pType` varchar(50) NOT NULL,
  `topping` varchar(50) DEFAULT NULL,
  `rating` int NOT NULL,
  `pDescription` text NOT NULL,
  `pic1` varchar(200) NOT NULL,
  `pic2` varchar(200) NOT NULL,
  `pic3` varchar(200) NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`pID`),
  CONSTRAINT `product_chk_1` CHECK (((`rating` >= 0) and (`rating` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Classic Bubble Milk Tea','Bubble Milk Tea','Brown Sugar',5,'Indulge in the sweet and refreshing taste of our signature bubble tea! Made with premium tea leaves and topped with chewy tapioca pearls, this drink is the perfect treat to satisfy your sweet tooth. Choose from a variety of delicious flavors, such as classic milk tea or fruity passionfruit, and customize your drink with your choice of toppings, including fresh fruit and jelly. With each sip, you\'ll experience a burst of flavor and a delightful texture that\'s sure to leave you wanting more!','https://drive.google.com/uc?export=view&id=108iRXvoO25WyWhpmzpqOFhj7iMx8tOlv','https://drive.google.com/uc?export=view&id=1RyXXeWrmu6W2ZfF7ZLzpMIU5wEPypsz5','https://drive.google.com/uc?export=view&id=1Sx5t_ldu7ELiiLpOWrG9-4UFgcs-bcKj',60),(2,'Chocolate Bubble Milk','Bubble Milk','Black Pearl',5,'Indulge in the rich and creamy taste of our chocolate bubble milk tea! Made with premium tea leaves and blended with smooth, velvety chocolate, this drink is the ultimate treat for chocolate lovers. Topped with chewy tapioca pearls, every sip offers a delightful burst of chocolatey goodness and a satisfying texture. Customize your drink with your choice of toppings, such as whipped cream or chocolate chips, and enjoy the perfect balance of sweet and decadent flavors. Satisfy your chocolate cravings today with our delicious chocolate bubble milk tea!','https://drive.google.com/uc?export=view&id=1DgjSclqKldXjVF1n0MpeksyiC6e_a0k3','https://drive.google.com/uc?export=view&id=1vEG_yn6NccFrDGmqZ-9WNbPs4r75pjAg','https://drive.google.com/uc?export=view&id=1Jnh8uMgCIHRC4gTarR1rgu17bnj4IyFI',60),(3,'Matcha Bubble Tea','Bubble Milk Tea','Black Pearl',5,'Experience the delicate and refreshing taste of our matcha bubble green tea! Made with premium matcha powder and blended with high-quality green tea, this drink is the perfect combination of sweet and earthy flavors. Topped with chewy tapioca pearls, every sip offers a delightful burst of green tea goodness and a satisfying texture. Customize your drink with your choice of toppings, such as mochi or red bean, and enjoy a unique and delightful drinking experience.','https://drive.google.com/uc?export=view&id=1vFTyJS-XXzdNVsRdt40GN7B8C1ndwAs_','https://drive.google.com/uc?export=view&id=18ahdQMLNOGUrm1zOA0aeQmsUo2Gxvnxl','https://drive.google.com/uc?export=view&id=14tw8rkzd2WU417NuMyqD7MNpYs7ODlLT',60),(4,'Oolong Milk Tea','Bubble Milk Tea','Grass Jelly',4,'Indulge in the smooth and mellow taste of our oolong bubble milk tea! Made with premium oolong tea leaves and blended with creamy milk, this drink offers a unique balance of fragrant aroma and milky sweetness. Topped with chewy tapioca pearls, every sip offers a delightful burst of flavor and a satisfying texture. Customize your drink with your choice of toppings, such as grass jelly or aloe vera, and enjoy the perfect combination of refreshing and indulgent flavors. Whether you\'re an oolong tea fan or a bubble tea lover, this drink is a must-try for anyone looking for a delicious and unique taste sensation!','https://drive.google.com/uc?export=view&id=1V8e8AMK5Zb_BrHx45bAXMVEhE5uRHinf','https://drive.google.com/uc?export=view&id=17gxFxP5y8lIK5T8b8b2BPXURTXzzM6og','https://drive.google.com/uc?export=view&id=1HXKQs-zpNP-Y6L5UJyAaMUQ4TKxgetdm',60),(5,'Strawberry Yoghurt Frappe','Fruit Yoghurt Frappe','Grass Jelly',3,'Indulge in the sweet and tangy taste of our Strawberry Yoghurt Frappe! Made with refreshing yoghurt and blended with fresh strawberries, this drink is the perfect balance of creamy and fruity flavors. Topped with whipped cream and strawberry sauce, every sip offers a delightful burst of flavor and a satisfying texture. Customize your drink with your choice of toppings, such as popping boba or strawberry jelly, and enjoy a unique and delightful drinking experience.','https://drive.google.com/uc?export=view&id=1Od8G0gU9w9s1D9xkwakiVCp61ywR0Omk','https://drive.google.com/uc?export=view&id=1IQ6VsDeRvWTgGUOZzU459twnEq2PRjAz','https://drive.google.com/uc?export=view&id=1_O8LlpwzfiiNyEAR01Ww8ittt-pyt4nr',55),(6,'Thai Bubble Tea','Bubble Milk Tea','Black Pearl',4,'Transport your taste buds to the streets of Thailand with our authentic Thai bubble tea. Made with premium ingredients and brewed to perfection, our bubble tea offers a unique blend of sweet and savory flavors that are sure to delight. From the first sip to the last, you\'ll experience the tantalizing taste of Thai tea combined with the chewy goodness of tapioca pearls. Come and try our signature bubble tea today and discover why it\'s the perfect way to refresh and recharge.','https://drive.google.com/uc?export=view&id=1el-tSLDiO57qOTXqL6mlkMXogSths20p','https://drive.google.com/uc?export=view&id=195SsgnZtO-K6HU12QZ07hEoPn3UlPiOu','https://drive.google.com/uc?export=view&id=12_sY2eNS0rYvT1uLRq2iuLU-yTRUwT_r',60),(7,'Taro Bubble Milk Tea','Bubble Milk Tea','Black Pearl',4,'Discover a new level of indulgence with our creamy and delicious taro bubble tea. Made with real taro root and blended to perfection, our bubble tea boasts a rich, velvety texture that is sure to please. Savor the subtle hints of vanilla and nuttiness with every sip, complemented by the satisfying chewiness of our tapioca pearls. Whether you\'re in need of a quick pick-me-up or simply craving a sweet treat, our taro bubble tea is the perfect choice.','https://drive.google.com/uc?export=view&id=1RY9Y5mHr2npnrsT-I0mquCzrWCoY79k0','https://drive.google.com/uc?export=view&id=1zhSWnfPiWld0Pz_hkv9YtFhNujciJ3O9','https://drive.google.com/uc?export=view&id=1P4-j2U45msCKT6iTXvTtdp2G6LX7hH9o',60);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-24 20:52:40
