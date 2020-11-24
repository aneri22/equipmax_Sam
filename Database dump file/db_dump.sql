-- MySQL dump 10.13  Distrib 5.6.15, for Win32 (x86)
--
-- Host: localhost    Database: sam
-- ------------------------------------------------------
-- Server version	5.6.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `allocation`
--

DROP TABLE IF EXISTS `allocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `allocation` (
  `Alloc_Id` int(11) NOT NULL AUTO_INCREMENT,
  `Loc_ID` int(11) DEFAULT NULL,
  `User_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`Alloc_Id`),
  KEY `Loc_ID` (`Loc_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `allocation_ibfk_1` FOREIGN KEY (`Loc_ID`) REFERENCES `locationtype` (`Loc_ID`),
  CONSTRAINT `allocation_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allocation`
--

LOCK TABLES `allocation` WRITE;
/*!40000 ALTER TABLE `allocation` DISABLE KEYS */;
INSERT INTO `allocation` VALUES (1,1,2),(2,4,10),(3,5,4),(4,2,1),(5,6,3),(6,7,12),(7,2,11),(8,1,14),(9,3,9),(10,8,15),(11,5,13),(12,9,7),(13,7,8),(14,10,6),(15,1,5);
/*!40000 ALTER TABLE `allocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `history` (
  `History_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Discovered` date DEFAULT NULL,
  `work_ID` int(11) DEFAULT NULL,
  `User_ID` int(11) DEFAULT NULL,
  `install_status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`History_ID`),
  KEY `work_ID` (`work_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `history_ibfk_1` FOREIGN KEY (`work_ID`) REFERENCES `workstation` (`work_ID`),
  CONSTRAINT `history_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (1,'2014-06-21',1,1,'installed'),(2,'2019-08-12',1,1,'uninstalled'),(3,'2019-08-12',1,1,'installed'),(4,'2019-08-12',1,1,'uninstalled'),(5,'2020-05-12',1,1,'installed'),(6,'2020-05-12',1,1,'installed'),(7,'2020-04-12',1,1,'uninstalled'),(8,'2020-05-04',1,1,'installed'),(9,'2020-05-13',1,1,'uninstalled'),(10,'2020-05-14',1,1,'uninstalled'),(11,'2020-02-10',1,1,'installed'),(12,'2020-06-14',2,2,'installed'),(13,'2020-06-14',2,3,'uninstalled'),(14,'2020-06-16',3,4,'uninstalled'),(15,'2020-06-18',3,4,'uninstalled'),(16,'2020-06-17',2,4,'installed'),(17,'2020-06-15',3,5,'uninstalled');
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `installation`
--

DROP TABLE IF EXISTS `installation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `installation` (
  `Installation_ID` int(11) NOT NULL AUTO_INCREMENT,
  `work_ID` int(11) DEFAULT NULL,
  `User_ID` int(11) DEFAULT NULL,
  `License_ID` int(11) DEFAULT NULL,
  `Alloc_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`Installation_ID`),
  KEY `work_ID` (`work_ID`),
  KEY `User_ID` (`User_ID`),
  KEY `License_ID` (`License_ID`),
  KEY `Alloc_Id` (`Alloc_Id`),
  CONSTRAINT `installation_ibfk_1` FOREIGN KEY (`work_ID`) REFERENCES `workstation` (`work_ID`),
  CONSTRAINT `installation_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`),
  CONSTRAINT `installation_ibfk_3` FOREIGN KEY (`License_ID`) REFERENCES `license` (`License_ID`),
  CONSTRAINT `installation_ibfk_4` FOREIGN KEY (`Alloc_Id`) REFERENCES `allocation` (`Alloc_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `installation`
--

LOCK TABLES `installation` WRITE;
/*!40000 ALTER TABLE `installation` DISABLE KEYS */;
INSERT INTO `installation` VALUES (1,1,1,1,1);
/*!40000 ALTER TABLE `installation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `license`
--

DROP TABLE IF EXISTS `license`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `license` (
  `License_ID` int(11) NOT NULL AUTO_INCREMENT,
  `License_Name` varchar(200) DEFAULT NULL,
  `License_Key` varchar(20) DEFAULT NULL,
  `Vendor_Name` varchar(200) DEFAULT NULL,
  `Manufacturer_Name` varchar(200) DEFAULT NULL,
  `Issue_date` date DEFAULT NULL,
  `License_Expiry_date` date DEFAULT NULL,
  `Purchase_Cost` float DEFAULT NULL,
  `Purchase_For` varchar(150) DEFAULT NULL,
  `Available_Count` int(11) DEFAULT NULL,
  `Software_ID` int(11) DEFAULT NULL,
  `Loc_ID` int(11) DEFAULT NULL,
  `Ltype_ID` int(11) DEFAULT NULL,
  `active_status` int(11) DEFAULT NULL,
  `Software_suite_ID` int(11) DEFAULT NULL,
  `allocated_license` int(11) DEFAULT NULL,
  `consume_status` varchar(20) DEFAULT NULL,
  `remaining` int(11) DEFAULT NULL,
  PRIMARY KEY (`License_ID`),
  KEY `Ltype_ID` (`Ltype_ID`),
  KEY `Software_ID` (`Software_ID`),
  KEY `Loc_ID` (`Loc_ID`),
  KEY `Software_suite_ID` (`Software_suite_ID`),
  CONSTRAINT `license_ibfk_1` FOREIGN KEY (`Ltype_ID`) REFERENCES `ltype` (`Ltype_ID`),
  CONSTRAINT `license_ibfk_2` FOREIGN KEY (`Software_ID`) REFERENCES `software` (`Software_ID`),
  CONSTRAINT `license_ibfk_3` FOREIGN KEY (`Loc_ID`) REFERENCES `locationtype` (`Loc_ID`),
  CONSTRAINT `license_ibfk_4` FOREIGN KEY (`Software_suite_ID`) REFERENCES `software_suite` (`Software_suite_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `license`
--

LOCK TABLES `license` WRITE;
/*!40000 ALTER TABLE `license` DISABLE KEYS */;
INSERT INTO `license` VALUES (1,'Chrome Freeware','ADCACADS','AAA softwares','Google softwares','2014-06-21','2020-08-06',450,'IT',5,31,1,5,1,NULL,4,'allocated',1),(2,'Adobe License','1GH987HJ5P','Adobe','Adobe','2014-01-12','2020-04-30',8000,'Accounts',0,6,2,7,0,NULL,6,'consumed',0),(3,'Adobe License','1GH987HU5P','Abobe','Adobe','2014-01-12','2020-06-10',8000,'Accounts',3,13,2,7,1,NULL,4,'consumed',0),(4,'Apache Public','GECG34CV','Global solutions','Apache ','2020-03-09','2020-09-03',5000,'Finance',4,14,2,2,1,NULL,5,'allocated',1),(5,'BSD 3 Clause','ADSFCXVS','ABC licenses','Oriental licenses','2017-02-23','2020-06-03',4000,'IT',10,NULL,3,2,1,11,5,'allocated',5),(6,'BSD 2 Clause','ADSFCccS','Just Tech licenses','JT licenses','2019-03-13','2020-06-05',7000,'FINANCE',4,NULL,2,7,1,6,3,'consumed',1),(7,'MIT License','XCVXCSFCS','Just Tech licenses','MIT licenses','2016-08-13','2020-10-09',12000,'HR',3,NULL,2,6,1,7,3,'allocated',0),(8,'Mozilla Public','ADSFCccS','Just Tech licenses','JT licenses','2018-06-13','2020-06-05',4000,'FINANCE',2,NULL,2,3,1,7,4,'consumed',2),(10,'Adobe License','1GH987HU5P','Abobe','Adobe','2014-01-12','2021-01-11',8000,'Accounts',4,7,2,7,1,NULL,3,'consumed',1),(11,'Xampp license','21HJP5O89Y','Microsoft','Microsoft','2019-02-12','2020-08-21',450,'IT',14,NULL,1,5,1,1,3,'allocated',11),(12,'Broadway','sdfsdxcv','jp and sons','jpc softwares and licenses','2020-05-20','2020-05-27',2232,'Finance',36,9,4,5,1,NULL,3,'allocated',33),(13,'general license','DSFC1212','ABC licenses','sunkey solutions','2020-05-18','2020-05-21',2323,'IT',45,3,1,1,0,NULL,3,'consumed',42),(14,'Cordova public','XDCSDFs','Chill techs','JPC softwares','2020-05-29','2020-05-26',34343,'Finance',66,5,6,3,1,NULL,3,'consumed',63),(15,'Apache free','SXCV#$#2','AAA ','abc technologies','2020-05-27','2020-05-10',34573,'Finance',48,5,2,2,1,NULL,3,'allocated',45),(16,'Adobe free ','DSCVXV','ABC vendors','ABC softwares','2020-05-14','2020-06-18',5654,'CS',25,25,4,3,0,NULL,3,'allocated',22),(17,'database public','SCSACBE','suntech sons','suntech','2020-05-26','2020-09-04',56564,'Finance',36,4,1,2,1,NULL,3,'consumed',33),(18,'General Apache','CVSAEXXV','suntech sons','suntech','2020-05-29','2020-08-07',4000,'Finance',46,9,4,3,1,NULL,4,'consumed',42),(19,'public editing','XCVXCV','media n sons','media tech','2020-05-30','2020-06-11',2323,'Sales',14,1,3,6,1,NULL,8,'consumed',6),(22,'Free General','XDFDSDF','Suntech and sons','Suntech','2020-06-14','2020-08-12',4000,'IT',33,8,4,1,1,NULL,2,'allocated',31),(23,'Apache General','ADSSCSA','Just Tech','Apache','2020-06-16','2020-09-03',40000,'IT',23,1,3,2,1,NULL,5,'allocated',18),(24,'Mozilla free','ASDFXCV','Suntech','suntech','2020-06-17','2020-06-20',7000,'Finance',5,3,3,2,0,NULL,5,'allocated',0),(25,'oracle free','XCVXCV','oracle n sons','Oracle','2020-06-17','2020-11-06',9000,'Finance',5,4,2,5,1,NULL,3,'consumed',2),(26,'ibm general free','XCVSDFSF','ibm softwares','ibm softwares','2020-06-17','2020-10-23',100000,'Finance',4,7,2,4,1,NULL,2,'consumed',2),(27,'Apache general','ASDFSDF','jbl','jbl','2020-06-17','2020-06-29',6000,'Finance',5,10,3,3,0,NULL,1,NULL,4),(28,'Kingston general','SDFSD','kingston','kingston','2020-06-17','2020-09-04',23232,'CS',33,15,3,2,1,NULL,3,NULL,30),(29,'google general','ASDFSDf','google ','google','2020-06-18','2020-09-25',343434,'Accounts',40,2,3,3,0,NULL,3,NULL,37),(30,'Amazon general','SDFSD','amazon','amazon','2020-06-17','2020-10-02',34234,'Finance',23,16,3,3,1,NULL,2,NULL,21),(31,'Wipro public','sdfSDFS','wipro','wipro','2020-06-18','2020-09-11',23432,'Finance',11,17,4,2,1,NULL,2,NULL,9),(32,'red hat general','sfSDFSD','red hat ','red hat','2020-06-17','2020-09-03',3434,'Finance',45,19,2,3,1,NULL,1,NULL,44),(33,'At and T public','SDFDA','at and t','AT and T','2020-06-17','2020-10-23',34343,'IT',26,20,7,4,1,NULL,4,NULL,22),(34,'opera general','SDFSDFDS','opera','Opera ','2020-06-05','2020-09-18',45654,'Finance',45,8,5,3,1,NULL,1,NULL,44),(35,'glassfish open','SDFSDF','saltes tech','salestech','2020-06-17','2020-11-05',56756,'IT',16,15,5,5,1,NULL,2,NULL,14),(36,'sdfsd','sdfsdf','sdfsdf','sdfsd','2020-06-18','2020-10-02',50000,'Accounts',67,21,3,3,1,NULL,1,NULL,66),(37,'ozone digital open','SADFSD','amc','amc','2020-06-18','2020-06-26',23432,'CS',5,1,4,2,0,NULL,1,NULL,4),(38,'asdfs','asdfsd','sadf','asdf','2020-06-18','2020-10-09',2342,'Finance',10,8,4,4,1,7,1,NULL,9),(40,'ozone public','CBFGFD','ozone','ozone','2020-06-18','2020-10-09',74466,'Finance',3,NULL,1,3,1,1,1,NULL,4),(45,'oracle general','DFGDFGDFG','sdfsd','oracle','2020-06-23','2020-06-26',3434,'Accounts',6,33,4,2,0,NULL,1,NULL,5),(46,'abc','SDFDSF','sdfsdf','sdfds','2020-06-22','2020-06-26',66666,'Accounts',12,33,4,3,0,NULL,1,NULL,11),(49,'check','SDFDSDFSDF','chek','check','2020-06-25','2020-06-26',23232,'IT',12,3,3,2,0,NULL,1,NULL,11),(50,'sdfds','CVBCVBC','XCVXCVX','check','2020-06-26','2020-06-27',4000,'Accounts',23,9,4,2,0,NULL,1,NULL,22),(51,'google free ','SFSDFSC','google softwares','google','2020-06-27','2020-07-02',10000,'Finance',12,2,4,2,0,NULL,1,NULL,11),(52,'amazon eula','XCVSDFDF','suntech','suntech','2020-06-29','2020-07-02',30000,'Finance',4,3,2,2,0,NULL,1,NULL,3),(53,'sample license','SDFDSF','test','test manu','2020-06-29','2020-09-11',23,'IT',3,5,1,2,1,NULL,1,NULL,2),(54,'Adobe Eula','SDFSDFsd','adobe','Adobe public','2020-06-29','2020-10-09',232323,'IT',5,7,1,2,0,NULL,1,NULL,4),(55,'test ','sDFSDF','aaa','aaa','2020-06-25','2020-10-16',34334,'CS',7,3,2,5,1,NULL,1,NULL,6),(56,'check','ASDFSd','check','check','2020-06-18','2020-10-16',3000,'Accounts',8,2,1,1,1,NULL,2,NULL,6),(57,'SAP general','SDFDSFS','sap','sap','2020-06-19','2020-07-01',5000,'Finance',4,3,1,6,0,NULL,1,NULL,3),(58,'Microsoft GNU','ASDFSDf','microsoft','microsoft','2020-06-30','2020-07-17',4000,'CS',3,10,2,6,1,NULL,1,NULL,2),(59,'Adobe EULA','FDGFGXCV','Suntech','Suntech','2020-07-14','2020-07-30',6000,'Accounts',34,3,8,2,1,NULL,1,NULL,33),(60,'Basic general','2sdfdfsd','asdfdf','safddf','2020-07-08','2020-08-20',50000,'Finance',22,14,2,1,1,NULL,2,NULL,20),(61,'Example','XCVSDFSDF','example','example','2020-07-09','2020-09-18',20000.2,'Finance',33,29,3,4,1,NULL,2,NULL,31),(63,'Sap GNU','xvxcvxcv','sap','sap','2020-07-09','2020-08-04',34476,'Finance',23,NULL,2,3,1,15,1,NULL,22),(64,'egpublic','SDFSDF','egpublic','Eg Public','2020-07-09','2020-07-10',3434,'IT',23,NULL,2,1,0,15,1,NULL,22),(65,'test site','testtesttest','test','test','2020-07-09','2020-07-24',1332,'Finance',23,NULL,8,5,1,15,1,NULL,22),(66,'redhat genereal','CVBDFGFDG','redhay','redhat','2020-07-09','2020-10-23',40000,'IT',4,19,1,3,1,NULL,1,NULL,3),(67,'jupyter site ','DFGDFGF','anaconda','Anaconda','2020-07-09','2020-09-18',3000,'Finance',2,26,3,5,1,NULL,1,NULL,1),(68,'Apple general','ASDFSDF','Apple','Apple','2020-07-09','2020-08-06',3000,'IT',4,37,2,2,1,NULL,1,NULL,3),(69,'Amazon Propritary','XCVSDF','Amazon','Amazon','2020-07-09','2020-08-03',3000,'Finance',2,35,7,3,1,NULL,2,NULL,0),(70,'Zoom premium','DFGDFGDF','Zoom','Zoom','2020-07-09','2020-09-11',3000,'Finance',3,22,2,3,0,NULL,1,NULL,2),(71,'google site ','SDFSDFXF','google','google','2020-07-13','2020-10-22',5000,'CS',10,14,1,5,1,NULL,1,NULL,9);
/*!40000 ALTER TABLE `license` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locationtype`
--

DROP TABLE IF EXISTS `locationtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locationtype` (
  `Loc_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Allo_Loc` varchar(255) DEFAULT NULL,
  `count_alloc` int(11) DEFAULT NULL,
  PRIMARY KEY (`Loc_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locationtype`
--

LOCK TABLES `locationtype` WRITE;
/*!40000 ALTER TABLE `locationtype` DISABLE KEYS */;
INSERT INTO `locationtype` VALUES (1,'Mumbai',10),(2,'Delhi',20),(3,'Chennai',50),(4,'Kolkata',60),(5,'Bangalore',50),(6,'Hyderabad',40),(7,'Pune',35),(8,'Navi Mumbai',70),(9,'Thane',80),(10,'Kalyan',30);
/*!40000 ALTER TABLE `locationtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ltype`
--

DROP TABLE IF EXISTS `ltype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ltype` (
  `Ltype_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Ltype_Name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Ltype_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltype`
--

LOCK TABLES `ltype` WRITE;
/*!40000 ALTER TABLE `ltype` DISABLE KEYS */;
INSERT INTO `ltype` VALUES (1,'GNU General Public License'),(2,'EULA'),(3,'Workstation license'),(4,'Concurrent user license'),(5,'Site license'),(6,'Perpetual License'),(7,'Proprietary license');
/*!40000 ALTER TABLE `ltype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsoftware`
--

DROP TABLE IF EXISTS `newsoftware`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newsoftware` (
  `new_software_id` int(11) NOT NULL AUTO_INCREMENT,
  `software_name` varchar(20) DEFAULT NULL,
  `software_id` int(11) DEFAULT NULL,
  `software_Version` float DEFAULT NULL,
  PRIMARY KEY (`new_software_id`),
  KEY `software_id` (`software_id`),
  CONSTRAINT `newsoftware_ibfk_1` FOREIGN KEY (`software_id`) REFERENCES `software` (`Software_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsoftware`
--

LOCK TABLES `newsoftware` WRITE;
/*!40000 ALTER TABLE `newsoftware` DISABLE KEYS */;
INSERT INTO `newsoftware` VALUES (1,'windows 7',10,7),(2,'windows 10',10,10.1),(3,'Adobe Photoshop SD',1,2.5),(4,'Adobe Photoshop 2.4',1,2.4),(5,'Adobe Photoshop pro',1,2.58),(6,'Adobe Photoshop ultr',1,0),(7,'Google chrome 2.1',2,2.1),(8,'Google chrome 4.1',2,4.1),(9,'Google chrome beta',2,2.8),(10,'Google chrome super',2,3.2),(11,'Netbeans 3.1',3,3.1),(12,'Netbeans 5.1',3,5.1),(13,'Netbeans beta',3,2.3),(14,'Netbeans super',3,5.5),(15,'Mysql 2.0',4,2.4),(16,'Mysql 2.0',4,2.4),(17,'Mysql 3.0',4,3.4),(18,'Mysql 5.0',4,4.5),(19,'Notepad 2',5,2.2),(20,'Notepad ++',5,3),(21,'Notepad 5',5,5.1),(22,'Notepad 4',5,4.2),(23,'Adobe Flash 9',6,9),(24,'Adobe Flash 10',6,10.1),(25,'Adobe Flash Player',6,10.3),(26,'Adobe Flash 11',6,11.1),(28,'Java SE 9',9,9.4),(29,'Java JDK 10',9,10),(31,'Sublime Text',8,3),(32,'Sublime Text 3.1',8,3.1),(33,'Sublime Text 3',8,3.2),(34,'Sublime Editor 3.2',8,3.3),(35,'SQL Server 2014',16,12),(36,'SQL Server 2016',16,13),(37,'SQL Server 2017',16,14),(38,'SQL Server 2019',16,15),(39,'RedHat Release 5',19,5.7),(40,'RedHat Enterprise 7.',19,7.8),(41,'RedHat Enterprise 8',19,8.1),(42,'RedHat 8.2 beta',19,8.2),(43,'SalesForce 18',15,215),(44,'SalesForce 19',15,216.1),(45,'SalesForce 19 Releas',15,216.2),(46,'SalesForce Cloud Con',15,219),(47,'SAP NW PI7.1',23,7.1),(48,'SAP Netweaver 7.3',23,7.3),(49,'SAP NW 7.4',23,7.4),(50,'SAP NW AS ABAP 7.51',23,7.5),(51,'Citrix workspace',20,4.8),(52,'Citrix System 19',20,4.1),(53,'Citrix workspace 19',20,4.11),(54,'Citrix Current Relea',20,4.12),(55,'windows 8',10,8.1),(56,'windows 8.1',10,8.1),(57,'windows 10 2004',10,10);
/*!40000 ALTER TABLE `newsoftware` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsuite`
--

DROP TABLE IF EXISTS `newsuite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newsuite` (
  `new_suite_id` int(11) NOT NULL AUTO_INCREMENT,
  `software_name` varchar(20) DEFAULT NULL,
  `software_suite_id` int(11) DEFAULT NULL,
  `Software_Suite_Version` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`new_suite_id`),
  KEY `software_suite_id` (`software_suite_id`),
  CONSTRAINT `newsuite_ibfk_1` FOREIGN KEY (`software_suite_id`) REFERENCES `software_suite` (`Software_suite_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsuite`
--

LOCK TABLES `newsuite` WRITE;
/*!40000 ALTER TABLE `newsuite` DISABLE KEYS */;
INSERT INTO `newsuite` VALUES (1,'Xammp 2.0',1,'2.0'),(2,'Xammp 3.0',1,'3.0'),(3,'Xammp 4.0',1,'4.0'),(4,'Adobe suite 2.0',5,'2.0'),(5,'Adobe Suite 2.0',5,'5.0'),(6,'Adobe Premium',5,'3.6'),(7,'GSuite 2.0',6,'2.0'),(8,'GSuite 3,0',6,'3.0');
/*!40000 ALTER TABLE `newsuite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `noid` int(11) NOT NULL AUTO_INCREMENT,
  `license_id` int(11) DEFAULT NULL,
  `license_name` varchar(20) DEFAULT NULL,
  `license_expiry_date` date DEFAULT NULL,
  `difference` int(11) DEFAULT NULL,
  `read_status` varchar(20) DEFAULT 'unread',
  PRIMARY KEY (`noid`),
  UNIQUE KEY `license_id` (`license_id`,`license_name`)
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,1,'Chrome Freeware','2020-08-06',30,'read'),(3,58,'Microsoft GNU','2020-07-17',10,'read'),(4,59,'Adobe EULA','2020-07-30',23,'unread'),(16,18,'General Apache','2020-08-07',30,'read'),(59,63,'Sap GNU','2020-08-04',26,'unread'),(61,64,'egpublic','2020-07-10',1,'read'),(62,65,'test site','2020-07-24',15,'unread'),(107,68,'Apple general','2020-08-06',27,'unread'),(108,69,'Amazon Propritary','2020-08-03',24,'unread'),(170,22,'Free General','2020-08-12',30,'unread'),(171,7,'MIT License','2020-10-09',13,'unread'),(172,26,'ibm general free','2020-10-23',27,'unread'),(173,29,'google general','2020-09-25',-1,'unread'),(174,30,'Amazon general','2020-10-02',6,'unread'),(175,33,'At and T public','2020-10-23',27,'unread'),(176,36,'sdfsd','2020-10-02',6,'unread'),(177,38,'asdfs','2020-10-09',13,'unread'),(178,40,'ozone public','2020-10-09',13,'unread'),(179,54,'Adobe Eula','2020-10-09',13,'unread'),(180,55,'test ','2020-10-16',20,'unread'),(181,56,'check','2020-10-16',20,'unread'),(182,66,'redhat genereal','2020-10-23',27,'unread'),(183,71,'google site ','2020-10-22',26,'unread');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oldsoftware`
--

DROP TABLE IF EXISTS `oldsoftware`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oldsoftware` (
  `oldsoftware_id` int(11) NOT NULL AUTO_INCREMENT,
  `oldsoftware_name` varchar(50) DEFAULT NULL,
  `oldsoftware_version` float DEFAULT NULL,
  `Installation_date` date DEFAULT NULL,
  `Upgrade_date` date DEFAULT NULL,
  `software_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`oldsoftware_id`),
  KEY `software_id` (`software_id`),
  CONSTRAINT `oldsoftware_ibfk_1` FOREIGN KEY (`software_id`) REFERENCES `software` (`Software_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oldsoftware`
--

LOCK TABLES `oldsoftware` WRITE;
/*!40000 ALTER TABLE `oldsoftware` DISABLE KEYS */;
INSERT INTO `oldsoftware` VALUES (1,'Google chrome 2.1',2.1,NULL,'2020-06-29',2),(2,'Adobe First Edition',1.1,'2013-03-12','2020-05-20',1),(3,'Adobe First Edition',1.1,'2013-03-12','2020-05-20',1),(4,'Google Chorme basic',2.1,'2014-03-11','2020-03-12',2),(5,'Google Chrome one',1.1,'2011-03-12','2019-05-20',2),(6,'NetBeans',8,'2018-06-12','2020-11-09',3),(7,'Google chrome beta',2.8,'2020-06-29','2021-09-25',2),(8,'mysql',8,'2019-09-01','2020-07-03',4),(9,'Notepad',2,'2018-07-13','2020-07-01',5),(10,'Adobe Photoshop',2.4,'2020-05-21','2020-07-10',1),(11,'Netbeans 5.1',5.1,'2020-06-29','2020-06-30',3),(12,'MYSQL',8,'2019-10-31','2020-06-30',4),(13,'Notepad',2,'2018-07-12','2020-07-01',5);
/*!40000 ALTER TABLE `oldsoftware` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oldsuite`
--

DROP TABLE IF EXISTS `oldsuite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oldsuite` (
  `oldsuite_id` int(11) NOT NULL AUTO_INCREMENT,
  `oldsuite_name` varchar(50) DEFAULT NULL,
  `oldsuite_version` float DEFAULT NULL,
  `Installation_date` date DEFAULT NULL,
  `Upgrade_date` date DEFAULT NULL,
  `software_suite_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`oldsuite_id`),
  KEY `software_suite_id` (`software_suite_id`),
  CONSTRAINT `oldsuite_ibfk_1` FOREIGN KEY (`software_suite_id`) REFERENCES `software_suite` (`Software_suite_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oldsuite`
--

LOCK TABLES `oldsuite` WRITE;
/*!40000 ALTER TABLE `oldsuite` DISABLE KEYS */;
INSERT INTO `oldsuite` VALUES (1,'adobe suite',3.1,NULL,'2020-06-29',5),(2,'Adobe Suite 2.0',5,NULL,'2020-06-29',5),(3,'Xammp 4.0',4,'2020-06-29','2021-04-11',1),(4,'office 2',2.1,'2020-05-15','2020-08-21',4),(5,'Adobe Premium',3.6,'2020-06-29','2020-07-15',5),(6,'Mac suite',11,'2016-02-25','2020-09-27',7),(10,'SoftMaker',2,'2020-06-30','2020-12-20',13);
/*!40000 ALTER TABLE `oldsuite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scategory`
--

DROP TABLE IF EXISTS `scategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scategory` (
  `SCategory_ID` int(11) NOT NULL AUTO_INCREMENT,
  `SCategory_Name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`SCategory_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scategory`
--

LOCK TABLES `scategory` WRITE;
/*!40000 ALTER TABLE `scategory` DISABLE KEYS */;
INSERT INTO `scategory` VALUES (1,'Accounting'),(2,'Education'),(3,'Graphics'),(4,'Multimedia'),(5,'Games'),(6,'Internet'),(7,'Development'),(8,'Database');
/*!40000 ALTER TABLE `scategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `software`
--

DROP TABLE IF EXISTS `software`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `software` (
  `Software_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Software_Name` varchar(200) DEFAULT NULL,
  `Software_Version` varchar(20) DEFAULT NULL,
  `Manufacturer_Name` varchar(200) DEFAULT NULL,
  `Publisher_Name` varchar(200) DEFAULT NULL,
  `SType_ID` int(11) DEFAULT NULL,
  `SubType_ID` int(11) DEFAULT NULL,
  `SCategory_ID` int(11) DEFAULT NULL,
  `Installation_Date` date DEFAULT NULL,
  `SDescription` varchar(255) DEFAULT NULL,
  `ptype` varchar(20) DEFAULT NULL,
  `installations` int(11) DEFAULT NULL,
  `compliant` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Software_ID`),
  KEY `SType_ID` (`SType_ID`),
  KEY `SubType_ID` (`SubType_ID`),
  KEY `SCategory_ID` (`SCategory_ID`),
  CONSTRAINT `software_ibfk_1` FOREIGN KEY (`SType_ID`) REFERENCES `stype` (`SType_ID`),
  CONSTRAINT `software_ibfk_2` FOREIGN KEY (`SubType_ID`) REFERENCES `subtype` (`SubType_ID`),
  CONSTRAINT `software_ibfk_3` FOREIGN KEY (`SCategory_ID`) REFERENCES `scategory` (`SCategory_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `software`
--

LOCK TABLES `software` WRITE;
/*!40000 ALTER TABLE `software` DISABLE KEYS */;
INSERT INTO `software` VALUES (1,'Adobe Photoshop pro','2.58','Adobe Inc','Microsoft Adobe',2,2,3,'2020-06-29',NULL,'software',50,'No'),(2,'Google chrome beta','2.8','Google','Google',2,4,6,'2020-06-29',NULL,'software',50,'No'),(3,'Netbeans beta','2.3','Oracle Corporation','Oracle Corporation',3,1,3,'2020-06-30',NULL,'software',100,'No'),(4,'Mysql 3.0','3.4','Microsoft','Microsoft',3,1,8,'2020-06-30',NULL,'software',15,'No'),(5,'Notepad ++','3','Microsoft','Microsoft',2,1,7,'2020-07-01',NULL,'software',26,'No'),(6,'Adobe Flash','2.9','Acrobat','Adobe',2,2,4,'2020-03-09','Software to edit photos','software',45,'No'),(7,'Adobe Reader','2.0','Adobe','Adobe',2,2,2,'2020-03-11','Adobe Reader','software',23,'No'),(8,'Sublime Editor','2.0.0','Sublime','Sublime Editor',2,1,2,'2020-03-17','Nice Software!!','software',56,'No'),(9,'Java','8.9','Suntech','Suntech',3,1,7,'2020-03-17','software for development','software',41,'No'),(10,'windows xp','1.0','microsoft','microsoft',1,2,1,'2020-05-19','really effective software','software',30,'No'),(13,'Adobe Photoshop 2.4','2.4','Adobe Inc','Microsoft Adobe',2,2,3,'2020-05-21','undefined','software',100,'No'),(14,'Google chrome 4.1','4.1.2','Google','Google',2,4,6,'2020-05-21','undefined','software',10,'No'),(15,'SalesForce','2.0.2','SF softwares','Microsoft',2,3,4,'2018-03-21',NULL,'software',34,'No'),(16,'SQL Server','2.0.2','SF softwares','Microsoft',2,3,4,'2019-04-22',NULL,'software',34,'No'),(17,'Visio','10.2.3','Visio softwares','Adobe',1,2,5,'2020-04-21',NULL,'software',22,'No'),(18,'Professional Windows','2.3','Microsoft Corporation','Microsoft',1,4,6,'2019-04-20',NULL,'software',55,'No'),(19,'Red Hat','20','Red Hat distributions','IBM',3,2,2,'2020-05-11',NULL,'software',150,'No'),(20,'Citrix Systems','2.3','Oracle','Oracle',3,4,7,'2018-02-21',NULL,'software',65,'No'),(21,'Mail Chimp','2.2','Mozilla corp','Mozilla',1,2,4,'2019-07-20',NULL,'software',14,'No'),(22,'Zoom','14.2.2','Zoom softwares','Suntech',3,3,2,'2017-08-22',NULL,'software',54,'No'),(23,'SAP','64 bit 7.0.2','ERP softwares','SAP',1,4,5,'2016-01-21',NULL,'software',134,'Yes'),(24,'Kaspersky','2.0','google softwares','google',1,3,2,'2020-06-14','Nice software for clearing antivirus','software',10,'Yes'),(25,'Adobe Photoshop 2.4','2.4','Adobe Inc','Microsoft Adobe',2,2,3,'2020-06-14','undefined','software',10,'No'),(26,'Jupyter','2.3','Adobe and sons','Adobe',2,2,7,'2020-06-20','nice software','software',10,'No'),(29,'ppp','5.5','51221','545454151',1,1,1,'2020-06-22','sds','software',10,'No'),(31,'Google chrome beta','4.2','Google','Google',2,4,6,'2020-06-23','undefined','software',10,'No'),(33,'sample','3.2','sdfdsf','sadsfd',2,2,3,'2020-06-23','sdfds','software',10,'No'),(35,'Amazon aws','2.3','Amazon','Amazon',3,1,2,'2020-07-08','Nice software','software',10,'No'),(36,'Cordova','3.3','Ambiant','Lava',1,1,6,'2020-07-09','Good','software',10,'yes'),(37,'Apple Itunes','2.2','Apple','Apple',1,1,1,'2020-07-10','Nice','software',10,'No');
/*!40000 ALTER TABLE `software` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `software_suite`
--

DROP TABLE IF EXISTS `software_suite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `software_suite` (
  `Software_suite_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Software_suite_Name` varchar(200) DEFAULT NULL,
  `Software_suite_Version` varchar(20) DEFAULT NULL,
  `Manufacturer_Name` varchar(200) DEFAULT NULL,
  `Publisher_Name` varchar(200) DEFAULT NULL,
  `SType_ID` int(11) DEFAULT NULL,
  `SubType_ID` int(11) DEFAULT NULL,
  `SCategory_ID` int(11) DEFAULT NULL,
  `Installation_Date` date DEFAULT NULL,
  `ptype` varchar(20) DEFAULT NULL,
  `installations` int(11) DEFAULT NULL,
  `compliant` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Software_suite_ID`),
  KEY `SType_ID` (`SType_ID`),
  KEY `SubType_ID` (`SubType_ID`),
  KEY `SCategory_ID` (`SCategory_ID`),
  CONSTRAINT `software_suite_ibfk_1` FOREIGN KEY (`SType_ID`) REFERENCES `stype` (`SType_ID`),
  CONSTRAINT `software_suite_ibfk_2` FOREIGN KEY (`SubType_ID`) REFERENCES `subtype` (`SubType_ID`),
  CONSTRAINT `software_suite_ibfk_3` FOREIGN KEY (`SCategory_ID`) REFERENCES `scategory` (`SCategory_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `software_suite`
--

LOCK TABLES `software_suite` WRITE;
/*!40000 ALTER TABLE `software_suite` DISABLE KEYS */;
INSERT INTO `software_suite` VALUES (1,'Xammp 4.0','4.0','Xampp','Xampp',3,4,8,'2020-06-29','software_suite',300,'No'),(4,'office 2','2.1','microsoft','microsoft',2,1,4,'2020-05-15','software_suite',140,'No'),(5,'Adobe Premium','3.6','adobe','adobe',2,3,3,'2020-06-29','software_suite',130,'No'),(6,'G suite','10.0.2','Google','Google',2,2,5,'2019-02-25','software_suite',74,'No'),(7,'Mac suite','11.0','Apple','Apple',1,3,4,'2016-02-25','software_suite',24,'No'),(8,'Oracle office pack','13.0.2','Oracle','Oracle',1,4,8,'2017-11-22','software_suite',44,'No'),(11,'Adobe Suite 2.0','2.0','adobe','adobe',2,3,3,'2020-06-19','software_suite',10,'No'),(12,'zssc','23','dff','nbnbhb',1,1,1,'2020-06-22','software_suite',10,'No'),(13,'SoftMaker','2.0','Microsoft','Microsoft',1,1,2,'2020-06-30','software_suite',10,'No'),(14,'AWS suite','3.3','Amazon','Amazon',1,1,1,'2020-07-09','software_suite',10,'Yes'),(15,'Sap Suite','1.0','Sapsuite','sap',1,1,1,'2020-07-09','software_suite',10,'No');
/*!40000 ALTER TABLE `software_suite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stype`
--

DROP TABLE IF EXISTS `stype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stype` (
  `SType_ID` int(11) NOT NULL AUTO_INCREMENT,
  `SType_Name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`SType_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stype`
--

LOCK TABLES `stype` WRITE;
/*!40000 ALTER TABLE `stype` DISABLE KEYS */;
INSERT INTO `stype` VALUES (1,'System Software'),(2,'Application Software'),(3,'Programming Software');
/*!40000 ALTER TABLE `stype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subtype`
--

DROP TABLE IF EXISTS `subtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subtype` (
  `SubType_ID` int(11) NOT NULL AUTO_INCREMENT,
  `SubType_Name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`SubType_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subtype`
--

LOCK TABLES `subtype` WRITE;
/*!40000 ALTER TABLE `subtype` DISABLE KEYS */;
INSERT INTO `subtype` VALUES (1,'Freeware'),(2,'Shareware'),(3,'Utility'),(4,'Browser');
/*!40000 ALTER TABLE `subtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `User_ID` int(11) NOT NULL AUTO_INCREMENT,
  `User_Name` varchar(200) DEFAULT NULL,
  `Email_ID` varchar(250) DEFAULT NULL,
  `Phone_number` int(12) DEFAULT NULL,
  `work_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`User_ID`),
  KEY `work_ID` (`work_ID`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`work_ID`) REFERENCES `workstation` (`work_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Madhu','madhu21@gmail.com',2147483647,1),(2,'Ramesh Patil','patil@gmail.com',2147483647,2),(3,'Amit Shah','shah@gmail.com',2147483647,3),(4,'Jignesh Patel','patel@gmail.com',2147483647,4),(5,'Mahesh Mistry','mistry@gmail.com',2147483647,6),(6,'Ajay Gupta','ajay@gmail.com',2147483647,5),(7,'Mukesh Sharma','mukesh@gmail.com',2147483647,2),(8,'Anand Kulkarni','anand@gmail.com',2147483647,1),(9,'Swati Gurav','sgurav@gmail.com',2147483647,5),(10,'Aneri Patel','g.aneri1@gmail.com',2147483647,6),(11,'Manju Gaikwad','mangaikwad@gmail.com',2147483647,4),(12,'Swara Sharma','swara.s@gmail.com',2147483647,3),(13,'Mayur Gupta','mayurg@gmail.com',2147483647,8),(14,'Pooja H','poojah@gmail.com',2147483647,7),(15,'Ashish P','ashp@gmail.com',2147483647,5);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_license`
--

DROP TABLE IF EXISTS `user_license`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_license` (
  `userli_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `license_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`userli_id`),
  UNIQUE KEY `uq_userlicense` (`user_id`,`license_id`),
  KEY `license_id` (`license_id`),
  CONSTRAINT `user_license_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`User_ID`),
  CONSTRAINT `user_license_ibfk_2` FOREIGN KEY (`license_id`) REFERENCES `license` (`License_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_license`
--

LOCK TABLES `user_license` WRITE;
/*!40000 ALTER TABLE `user_license` DISABLE KEYS */;
INSERT INTO `user_license` VALUES (1,1,2),(3,1,4),(4,1,5),(66,1,23),(5,2,1),(6,2,2),(7,2,4),(8,2,6),(14,2,7),(53,2,14),(51,2,24),(70,2,56),(9,3,2),(11,3,3),(10,3,4),(12,3,6),(13,3,8),(15,3,10),(93,3,19),(67,3,28),(16,4,15),(17,4,18),(43,4,24),(74,4,25),(89,4,35),(77,4,59),(92,4,71),(19,5,1),(20,5,3),(21,5,5),(22,5,11),(48,5,13),(72,5,17),(18,5,19),(46,5,23),(28,6,1),(23,6,2),(30,6,3),(24,6,11),(26,6,12),(25,6,13),(27,6,16),(29,6,17),(62,6,19),(69,6,29),(88,6,60),(80,6,67),(85,6,69),(36,7,5),(32,7,7),(33,7,8),(34,7,10),(35,7,12),(31,7,15),(37,7,16),(49,7,18),(65,7,19),(52,7,22),(68,7,23),(83,7,68),(39,8,2),(40,8,4),(41,8,5),(38,8,8),(79,8,18),(42,8,19),(44,8,24),(78,8,25),(71,8,29),(86,8,70),(45,9,24),(76,9,26),(61,10,19),(64,10,23),(87,10,31),(81,10,33),(63,11,19),(90,11,28),(73,12,25),(91,14,30),(84,14,69),(75,15,14),(82,15,61);
/*!40000 ALTER TABLE `user_license` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workstation`
--

DROP TABLE IF EXISTS `workstation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workstation` (
  `work_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Server_Name` varchar(255) DEFAULT NULL,
  `no_of_instal` int(11) DEFAULT NULL,
  `licen_no_instal` int(11) DEFAULT NULL,
  `unlicen_no_instal` int(11) DEFAULT NULL,
  `Work_Name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`work_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workstation`
--

LOCK TABLES `workstation` WRITE;
/*!40000 ALTER TABLE `workstation` DISABLE KEYS */;
INSERT INTO `workstation` VALUES (1,'Application',2,6,6,'Dell'),(2,'Apache',22,44,23,'Lenovo'),(3,'Apache',22,44,23,'Lenovo'),(4,'Windows Server',45,44,43,'Lenovo'),(5,'Glashfish',32,35,23,'Inspiron'),(6,'Apt201',62,54,67,'Compaq'),(7,'Jetty',71,16,55,'HP'),(8,'iPlanet Web Server',90,54,36,'Dell'),(9,'JBoss Enterprise Application',46,24,22,'Lenovo'),(10,'Microsoft Application Server',81,40,41,'Compaq');
/*!40000 ALTER TABLE `workstation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-23 21:30:50
