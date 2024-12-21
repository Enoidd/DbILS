-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: Database_ils
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Attività`
--

DROP TABLE IF EXISTS `Attività`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attività` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DataInizio` date NOT NULL,
  `DataFine` date DEFAULT NULL,
  `Titolo` varchar(255) DEFAULT NULL,
  `Descrizione` text,
  `Note` text,
  `Resolution` text,
  `Responsabile` int NOT NULL,
  `TipoAttività` enum('OnCallSupport','Correttive','FieldEngineering','OnSiteSupport') NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_Attività_Responsabile` (`Responsabile`),
  CONSTRAINT `FK_Attività_Responsabile` FOREIGN KEY (`Responsabile`) REFERENCES `Responsabili` (`ID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attività`
--

LOCK TABLES `Attività` WRITE;
/*!40000 ALTER TABLE `Attività` DISABLE KEYS */;
INSERT INTO `Attività` VALUES (1,'2024-12-01','2024-12-15','Manutenzione Server','Descrizione dettagliata','','Prova',1,'OnCallSupport'),(2,'2024-12-06',NULL,'Test Correttive Critica',NULL,NULL,NULL,1,'Correttive'),(3,'2024-12-06',NULL,'Test FieldEngineering Non Critica',NULL,NULL,NULL,1,'FieldEngineering'),(4,'2024-12-06',NULL,'Test OnCallSupport',NULL,NULL,NULL,1,'OnCallSupport'),(5,'2024-12-06',NULL,'Test OnSiteSupport',NULL,NULL,NULL,1,'OnSiteSupport');
/*!40000 ALTER TABLE `Attività` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `BeforeInsertDataInizio` BEFORE INSERT ON `Attività` FOR EACH ROW BEGIN
    
    IF NEW.DataInizio IS NULL THEN
        SET NEW.DataInizio = CURRENT_DATE;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `BeforeUpdateDataFine` BEFORE UPDATE ON `Attività` FOR EACH ROW BEGIN
    
    IF NEW.DataFine IS NOT NULL AND NEW.DataFine < NEW.DataInizio THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La DataFine non può essere prima della DataInizio.';
    END IF;

    
    IF NEW.DataFine IS NULL THEN
        SET NEW.DataFine = CURRENT_DATE;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Base`
--

DROP TABLE IF EXISTS `Base`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Base` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Base_Citta` varchar(255) NOT NULL,
  `Base_Via` varchar(255) NOT NULL,
  `Base_NumeroCivico` varchar(255) NOT NULL,
  `Base_CAP` varchar(10) NOT NULL,
  `Base_Nome` varchar(255) NOT NULL,
  `Base_Stormo` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Base_Nome` (`Base_Nome`),
  UNIQUE KEY `Base_Nome_2` (`Base_Nome`,`Base_Citta`),
  UNIQUE KEY `Base_Nome_3` (`Base_Nome`),
  UNIQUE KEY `Base_Nome_4` (`Base_Nome`),
  CONSTRAINT `Base_chk_1` CHECK (regexp_like(`Base_Stormo`,_utf8mb4'^[a-zA-Z0-9]+$'))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Base`
--

LOCK TABLES `Base` WRITE;
/*!40000 ALTER TABLE `Base` DISABLE KEYS */;
INSERT INTO `Base` VALUES (1,'wce','wecwe','3223','243','cvsdc','6'),(2,'Galatina','Via Galatinadf','12334','1234534','Galatina Giancarloff','615'),(4,'Velletri','Viale','108','00049','Base_PROVA1','6');
/*!40000 ALTER TABLE `Base` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FieldEngineering`
--

DROP TABLE IF EXISTS `FieldEngineering`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FieldEngineering` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Progressivo` int DEFAULT NULL,
  `Allegati` text,
  `BaseID` int NOT NULL,
  `TipologiaRichiesta` enum('MS','CM','TC','I') NOT NULL,
  `AttivitàID` int NOT NULL,
  `DataRisoluzione` date DEFAULT NULL,
  `Criticita` enum('critica','non critica') NOT NULL,
  `Allegato` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_FieldEngineering_Base` (`BaseID`),
  KEY `FK_FieldEngineering_Attività` (`AttivitàID`),
  CONSTRAINT `FK_FieldEngineering_Attività` FOREIGN KEY (`AttivitàID`) REFERENCES `Attività` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_FieldEngineering_Base` FOREIGN KEY (`BaseID`) REFERENCES `Base` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FieldEngineering`
--

LOCK TABLES `FieldEngineering` WRITE;
/*!40000 ALTER TABLE `FieldEngineering` DISABLE KEYS */;
INSERT INTO `FieldEngineering` VALUES (1,1,NULL,2,'MS',3,'2025-01-03','non critica',NULL);
/*!40000 ALTER TABLE `FieldEngineering` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `SetProgressivo_FieldEngineering` BEFORE INSERT ON `FieldEngineering` FOR EACH ROW BEGIN
    DECLARE next_progressivo INT;

    
    SELECT IFNULL(MAX(Progressivo), 0) + 1
    INTO next_progressivo
    FROM FieldEngineering
    WHERE BaseID = NEW.BaseID;

    
    SET NEW.Progressivo = next_progressivo;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `BeforeInsertOrUpdate_FieldEngineering` BEFORE INSERT ON `FieldEngineering` FOR EACH ROW BEGIN
    DECLARE giorni INT;
    DECLARE data_inizio DATE;

    
    SELECT DataInizio INTO data_inizio
    FROM Attività
    WHERE ID = NEW.AttivitàID;

    
    IF NEW.Criticita = 'critica' THEN
        SET giorni = 3;
    ELSE
        SET giorni = 20;
    END IF;

    
    SET NEW.DataRisoluzione = CalcolaDataLavorativa(data_inizio, giorni);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `FieldEngineering_DataRisoluzioneCheck` BEFORE UPDATE ON `FieldEngineering` FOR EACH ROW BEGIN
    
    IF (NEW.TipologiaRichiesta IN ('MS', 'CM')) AND (NEW.DataRisoluzione IS NOT NULL) AND (NEW.Allegato IS NULL OR NEW.Allegato = '') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'È obbligatorio caricare un allegato per concludere un task MS o CM';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `FieldEngineering_Update_DataFine` AFTER UPDATE ON `FieldEngineering` FOR EACH ROW BEGIN
    IF NEW.DataRisoluzione IS NOT NULL THEN
        UPDATE Attività
        SET DataFine = NEW.DataRisoluzione
        WHERE ID = NEW.AttivitàID;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `GFE`
--

DROP TABLE IF EXISTS `GFE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GFE` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `SN` varchar(255) NOT NULL,
  `PN` varchar(255) NOT NULL,
  `NUC` varchar(255) NOT NULL,
  `Marca` varchar(255) NOT NULL,
  `Modello` varchar(255) NOT NULL,
  `DataArrivo` date NOT NULL,
  `Quantità` int NOT NULL DEFAULT '0',
  `BaseID` int NOT NULL,
  `GruppoID` int NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `SN` (`SN`),
  UNIQUE KEY `NUC` (`NUC`),
  KEY `BaseID` (`BaseID`),
  KEY `GruppoID` (`GruppoID`),
  CONSTRAINT `GFE_ibfk_1` FOREIGN KEY (`BaseID`) REFERENCES `Base` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `GFE_ibfk_2` FOREIGN KEY (`GruppoID`) REFERENCES `Gruppo` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GFE`
--

LOCK TABLES `GFE` WRITE;
/*!40000 ALTER TABLE `GFE` DISABLE KEYS */;
/*!40000 ALTER TABLE `GFE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Gruppo`
--

DROP TABLE IF EXISTS `Gruppo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Gruppo` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NomeGruppo` varchar(255) NOT NULL,
  `Descrizione` text,
  `BaseID` int NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `NomeGruppo` (`NomeGruppo`),
  UNIQUE KEY `NomeGruppo_2` (`NomeGruppo`),
  KEY `FK_BaseGruppo` (`BaseID`),
  CONSTRAINT `FK_BaseGruppo` FOREIGN KEY (`BaseID`) REFERENCES `Base` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Gruppo`
--

LOCK TABLES `Gruppo` WRITE;
/*!40000 ALTER TABLE `Gruppo` DISABLE KEYS */;
INSERT INTO `Gruppo` VALUES (2,'Gruppo2','',1);
/*!40000 ALTER TABLE `Gruppo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Magazzino`
--

DROP TABLE IF EXISTS `Magazzino`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Magazzino` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(255) NOT NULL,
  `Palazzina` enum('M0','W0') NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Nome` (`Nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Magazzino`
--

LOCK TABLES `Magazzino` WRITE;
/*!40000 ALTER TABLE `Magazzino` DISABLE KEYS */;
/*!40000 ALTER TABLE `Magazzino` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MaterialiMagazzino`
--

DROP TABLE IF EXISTS `MaterialiMagazzino`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MaterialiMagazzino` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `MagazzinoID` int NOT NULL,
  `Categoria` enum('Consumabile','Hardware') NOT NULL,
  `Tipologia` varchar(255) NOT NULL,
  `Marca` varchar(255) DEFAULT NULL,
  `Modello` varchar(255) DEFAULT NULL,
  `PN` varchar(255) NOT NULL,
  `SN` varchar(255) DEFAULT NULL,
  `Quantità` int NOT NULL DEFAULT '0',
  `DataArrivo` date NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `MagazzinoID` (`MagazzinoID`),
  CONSTRAINT `MaterialiMagazzino_ibfk_1` FOREIGN KEY (`MagazzinoID`) REFERENCES `Magazzino` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MaterialiMagazzino`
--

LOCK TABLES `MaterialiMagazzino` WRITE;
/*!40000 ALTER TABLE `MaterialiMagazzino` DISABLE KEYS */;
/*!40000 ALTER TABLE `MaterialiMagazzino` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Movimentazioni`
--

DROP TABLE IF EXISTS `Movimentazioni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Movimentazioni` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `MaterialeID` int NOT NULL,
  `MagazzinoID` int NOT NULL,
  `TipoMovimento` enum('Prelievo','Ritiro') NOT NULL,
  `Quantità` int NOT NULL,
  `DataMovimento` date NOT NULL,
  `BaseID` int DEFAULT NULL,
  `GruppoID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `MaterialeID` (`MaterialeID`),
  KEY `MagazzinoID` (`MagazzinoID`),
  KEY `BaseID` (`BaseID`),
  KEY `GruppoID` (`GruppoID`),
  CONSTRAINT `Movimentazioni_ibfk_1` FOREIGN KEY (`MaterialeID`) REFERENCES `MaterialiMagazzino` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `Movimentazioni_ibfk_2` FOREIGN KEY (`MagazzinoID`) REFERENCES `Magazzino` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `Movimentazioni_ibfk_3` FOREIGN KEY (`BaseID`) REFERENCES `Base` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `Movimentazioni_ibfk_4` FOREIGN KEY (`GruppoID`) REFERENCES `Gruppo` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Movimentazioni`
--

LOCK TABLES `Movimentazioni` WRITE;
/*!40000 ALTER TABLE `Movimentazioni` DISABLE KEYS */;
/*!40000 ALTER TABLE `Movimentazioni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OnCallSupport`
--

DROP TABLE IF EXISTS `OnCallSupport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OnCallSupport` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TipologiaRichiesta` enum('MS','CM','EX') NOT NULL,
  `Criticita` enum('critica','non critica') NOT NULL,
  `DataRisoluzione` date DEFAULT NULL,
  `MagazzinoID` int NOT NULL,
  `BaseID` int NOT NULL,
  `Progressivo` int NOT NULL,
  `AttivitàID` int NOT NULL,
  `Allegato` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `MagazzinoID` (`MagazzinoID`),
  KEY `FK_OnCallSupport_Base` (`BaseID`),
  KEY `FK_OnCallSupport_Attività` (`AttivitàID`),
  CONSTRAINT `FK_OnCallSupport_Attività` FOREIGN KEY (`AttivitàID`) REFERENCES `Attività` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_OnCallSupport_Base` FOREIGN KEY (`BaseID`) REFERENCES `Base` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OnCallSupport`
--

LOCK TABLES `OnCallSupport` WRITE;
/*!40000 ALTER TABLE `OnCallSupport` DISABLE KEYS */;
/*!40000 ALTER TABLE `OnCallSupport` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `SetProgressivo_OnCallSupport` BEFORE INSERT ON `OnCallSupport` FOR EACH ROW BEGIN
    DECLARE next_progressivo INT;

    
    SELECT IFNULL(MAX(Progressivo), 0) + 1
    INTO next_progressivo
    FROM OnCallSupport
    WHERE BaseID = NEW.BaseID;

    
    SET NEW.Progressivo = next_progressivo;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `BeforeInsertOrUpdate_OnCallSupport` BEFORE INSERT ON `OnCallSupport` FOR EACH ROW BEGIN
    DECLARE giorni INT;
    DECLARE data_inizio DATE;

    
    SELECT DataInizio INTO data_inizio
    FROM Attività
    WHERE ID = NEW.AttivitàID;

    
    IF NEW.Criticita = 'critica' THEN
        SET giorni = 3;
    ELSE
        SET giorni = 20;
    END IF;

    
    SET NEW.DataRisoluzione = CalcolaDataLavorativa(data_inizio, giorni);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Prelievo_MS` AFTER INSERT ON `OnCallSupport` FOR EACH ROW BEGIN
    IF NEW.TipologiaRichiesta = 'MS' THEN
        INSERT INTO Movimentazioni (MaterialeID, MagazzinoID, TipoMovimento, Quantità, BaseID)
        VALUES (
            (SELECT ID FROM MaterialiMagazzino WHERE Categoria = 'Consumabile' LIMIT 1),
            NEW.MagazzinoID,
            'Prelievo',
            1,
            NEW.BaseID
        );
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `OnCallSupport_DataRisoluzioneCheck` BEFORE UPDATE ON `OnCallSupport` FOR EACH ROW BEGIN
    
    IF (NEW.TipologiaRichiesta IN ('MS', 'CM')) AND (NEW.DataRisoluzione IS NOT NULL) AND (NEW.Allegato IS NULL OR NEW.Allegato = '') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'È obbligatorio caricare un allegato per concludere un task MS o CM';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `OnCallSupport_Update_DataFine` AFTER UPDATE ON `OnCallSupport` FOR EACH ROW BEGIN
    IF NEW.DataRisoluzione IS NOT NULL THEN
        UPDATE Attività
        SET DataFine = NEW.DataRisoluzione
        WHERE ID = NEW.AttivitàID;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `OnSiteSupport`
--

DROP TABLE IF EXISTS `OnSiteSupport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OnSiteSupport` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TipologiaRichiesta` enum('MS','CM','TC','I') NOT NULL,
  `Criticita` enum('critica','non critica') NOT NULL,
  `DataRisoluzione` date DEFAULT NULL,
  `MagazzinoID` int NOT NULL,
  `TipologiaTraining` enum('Basic Pilot','Personalized','System Administrator') DEFAULT NULL,
  `BaseID` int NOT NULL,
  `Progressivo` int NOT NULL,
  `AttivitàID` int NOT NULL,
  `Allegato` varchar(255) DEFAULT NULL,
  `MaterialeID` int NOT NULL,
  `Quantità` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `MagazzinoID` (`MagazzinoID`),
  KEY `FK_OnSiteSupport_Base` (`BaseID`),
  KEY `FK_OnSiteSupport_Attività` (`AttivitàID`),
  CONSTRAINT `FK_OnSiteSupport_Attività` FOREIGN KEY (`AttivitàID`) REFERENCES `Attività` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_OnSiteSupport_Base` FOREIGN KEY (`BaseID`) REFERENCES `Base` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OnSiteSupport`
--

LOCK TABLES `OnSiteSupport` WRITE;
/*!40000 ALTER TABLE `OnSiteSupport` DISABLE KEYS */;
/*!40000 ALTER TABLE `OnSiteSupport` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `SetProgressivo_OnSiteSupport` BEFORE INSERT ON `OnSiteSupport` FOR EACH ROW BEGIN
    DECLARE next_progressivo INT;

    
    SELECT IFNULL(MAX(Progressivo), 0) + 1
    INTO next_progressivo
    FROM OnSiteSupport
    WHERE BaseID = NEW.BaseID;

    
    SET NEW.Progressivo = next_progressivo;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `BeforeInsertOrUpdate_OnSiteSupport` BEFORE INSERT ON `OnSiteSupport` FOR EACH ROW BEGIN
    DECLARE giorni INT;
    DECLARE data_inizio DATE;

    
    SELECT DataInizio INTO data_inizio
    FROM Attività
    WHERE ID = NEW.AttivitàID;

    
    IF NEW.Criticita = 'critica' THEN
        SET giorni = 3;
    ELSE
        SET giorni = 20;
    END IF;

    
    SET NEW.DataRisoluzione = CalcolaDataLavorativa(data_inizio, giorni);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `OnSiteSupport_Movimentazioni` AFTER INSERT ON `OnSiteSupport` FOR EACH ROW BEGIN
    
    IF NEW.TipologiaRichiesta = 'MS' THEN
        
        INSERT INTO Movimentazioni (MaterialeID, MagazzinoID, TipoMovimento, Quantità, DataMovimento, BaseID)
        VALUES (NEW.MaterialeID, NEW.MagazzinoID, 'Fornitura', NEW.Quantità, CURDATE(), NEW.BaseID);
    ELSEIF NEW.TipologiaRichiesta = 'CM' THEN
        
        INSERT INTO Movimentazioni (MaterialeID, MagazzinoID, TipoMovimento, Quantità, DataMovimento, BaseID)
        VALUES (NEW.MaterialeID, NEW.MagazzinoID, 'Ritiro', NEW.Quantità, CURDATE(), NEW.BaseID);
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `OnSiteSupport_DataRisoluzioneCheck` BEFORE UPDATE ON `OnSiteSupport` FOR EACH ROW BEGIN
    
    IF (NEW.TipologiaRichiesta IN ('MS', 'CM')) AND (NEW.DataRisoluzione IS NOT NULL) AND (NEW.Allegato IS NULL OR NEW.Allegato = '') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'È obbligatorio caricare un allegato per concludere un task MS o CM';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `OnSiteSupport_Update_DataFine` AFTER UPDATE ON `OnSiteSupport` FOR EACH ROW BEGIN
    IF NEW.DataRisoluzione IS NOT NULL THEN
        UPDATE Attività
        SET DataFine = NEW.DataRisoluzione
        WHERE ID = NEW.AttivitàID;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Responsabili`
--

DROP TABLE IF EXISTS `Responsabili`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Responsabili` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(255) NOT NULL,
  `Cognome` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Nome` (`Nome`,`Cognome`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Responsabili`
--

LOCK TABLES `Responsabili` WRITE;
/*!40000 ALTER TABLE `Responsabili` DISABLE KEYS */;
INSERT INTO `Responsabili` VALUES (2,'ad',''),(1,'Fabio','Menichelli'),(3,'fd','dfv');
/*!40000 ALTER TABLE `Responsabili` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Riferimento_AMI`
--

DROP TABLE IF EXISTS `Riferimento_AMI`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Riferimento_AMI` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Grado` enum('S. Ten.','Ten.','Cap.','Magg.','Ten. Col.','Col.','Gen. B.A.','Gen. D.A.','Gen. S.A.','Gen.','Serg.','Serg. Magg.','Serg. Magg. Capo','Maresc.','Maresc. Ord.','Maresc. Capo','1° Maresc.','1° Maresc. Luogoten.','Av.','Av. Sc.','Av. Capo','1° Av.','1° Av. Capo','Av. Capo Sc.','1° Av. Capo Sc.') DEFAULT NULL,
  `Nome` varchar(255) NOT NULL,
  `Cognome` varchar(255) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Numero_Telefono` varchar(15) DEFAULT NULL,
  `Numero_Cellulare` varchar(15) DEFAULT NULL,
  `GruppoID` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_RiferimentoAMI_Gruppo` (`GruppoID`),
  CONSTRAINT `FK_RiferimentoAMI_Gruppo` FOREIGN KEY (`GruppoID`) REFERENCES `Gruppo` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Riferimento_AMI_chk_1` CHECK (((`Numero_Telefono` is not null) or (`Numero_Cellulare` is not null)))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Riferimento_AMI`
--

LOCK TABLES `Riferimento_AMI` WRITE;
/*!40000 ALTER TABLE `Riferimento_AMI` DISABLE KEYS */;
INSERT INTO `Riferimento_AMI` VALUES (4,'S. Ten.','dfsvdfvs','fvasf','vfsdfv','343325','',2),(6,'S. Ten.','adsad','ecfwe','rrvgaeg','45632565','',2),(7,'S. Ten.','dscfhnf','sddfxhn','sdsfdfhnf','432534565','',2);
/*!40000 ALTER TABLE `Riferimento_AMI` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Scaffali`
--

DROP TABLE IF EXISTS `Scaffali`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Scaffali` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `MagazzinoID` int NOT NULL,
  `Colonna` enum('AM0','BM0','CM0','DM0','EM0','FM0','AW0','BW0','CW0','DW0','EW0','FW0') NOT NULL,
  `Ripiano` enum('AM01','AM02','AM03','AM04','AM05','FM01','FM02','FM03','FM04','FM05','AW01','AW02','AW03','AW04','AW05','FW01','FW02','FW03','FW04','FW05') NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `MagazzinoID` (`MagazzinoID`),
  CONSTRAINT `Scaffali_ibfk_1` FOREIGN KEY (`MagazzinoID`) REFERENCES `Magazzino` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Scaffali`
--

LOCK TABLES `Scaffali` WRITE;
/*!40000 ALTER TABLE `Scaffali` DISABLE KEYS */;
/*!40000 ALTER TABLE `Scaffali` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-20 16:00:53
