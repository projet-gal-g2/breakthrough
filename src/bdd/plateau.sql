-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 11 jan. 2018 à 20:48
-- Version du serveur :  5.7.19
-- Version de PHP :  5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `breakthrough`
--

-- --------------------------------------------------------

--
-- Structure de la table `plateau`
--

DROP TABLE IF EXISTS `plateau`;
CREATE TABLE IF NOT EXISTS `plateau` (
  `id_partie` int(11) NOT NULL,
  `departL` int(11) NOT NULL,
  `departC` int(11) NOT NULL,
  `arriveL` int(11) NOT NULL,
  `arriveC` int(11) NOT NULL,
  `timer` int(11) NOT NULL DEFAULT '0',
  `nombreDeCoup` int(11) NOT NULL DEFAULT '0',
  `abandon` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
