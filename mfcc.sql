-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2023 at 06:00 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mfcc`
--

-- --------------------------------------------------------

--
-- Table structure for table `flight`
--

CREATE TABLE `flight` (
  `id` varchar(10) DEFAULT NULL,
  `fromAirport` varchar(10) DEFAULT NULL,
  `fromTime` varchar(10) DEFAULT NULL,
  `toAirport` varchar(10) DEFAULT NULL,
  `toTime` varchar(10) DEFAULT NULL,
  `boarding` varchar(10) DEFAULT NULL,
  `departure` varchar(10) DEFAULT NULL,
  `arrival` varchar(10) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `seats` int(11) DEFAULT NULL,
  `price` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_german2_ci;

--
-- Dumping data for table `flight`
--

INSERT INTO `flight` (`id`, `fromAirport`, `fromTime`, `toAirport`, `toTime`, `boarding`, `departure`, `arrival`, `company`, `seats`, `price`) VALUES
('YM690', 'CLJ', '07:30', 'MAD', '15:00', '09:00', '09:30', '14:30', 'WizzAir', 119, '149.99'),
('QD954', 'BER', '15:00', 'ATH', '18:00', '16:00', '17:00', '18:00', 'RyanAir', 150, '79.99');

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL,
  `flightId` varchar(10) NOT NULL,
  `clientId` int(11) NOT NULL,
  `createdAt` varchar(100) NOT NULL,
  `terminal` int(11) NOT NULL,
  `gate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`id`, `flightId`, `clientId`, `createdAt`, `terminal`, `gate`) VALUES
(1, 'YM690', 1, '2023-12-06T16:31:43.910Z', 7, 14);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `flight`
--
ALTER TABLE `flight`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
