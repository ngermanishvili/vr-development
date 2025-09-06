-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 04, 2025 at 01:39 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shekvetili_apartments`
--

-- --------------------------------------------------------

--
-- Table structure for table `blocks`
--

CREATE TABLE `blocks` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `block_name` varchar(50) NOT NULL,
  `block_code` varchar(10) NOT NULL,
  `total_floors` int(11) NOT NULL,
  `total_apartments` int(11) DEFAULT 0,
  `building_type` varchar(100) DEFAULT NULL,
  `status` enum('planning','under_construction','completed') DEFAULT 'completed',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blocks`
--

INSERT INTO `blocks` (`id`, `project_id`, `block_name`, `block_code`, `total_floors`, `total_apartments`, `building_type`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Block A ', 'A', 11, 416, '11 სართულიანი შენობა', 'completed', '2025-09-02 10:16:18', '2025-09-02 10:59:23'),
(2, 1, 'Block B1 - 7 BuildingBlock A - 11 Floor Building', 'B1', 7, 116, '7 სართულიანი შენობა', 'completed', '2025-09-02 10:16:18', '2025-09-02 10:59:14'),
(3, 1, 'Block B2 - 7 Building', 'B2', 7, 116, '7 სართულიანი შენობა', 'completed', '2025-09-02 10:16:18', '2025-09-02 10:16:34'),
(4, 1, 'C1-12 Floor Building', 'C1', 12, 214, '12 სართულიანი შენობა', 'completed', '2025-09-02 10:16:18', '2025-09-02 10:16:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_project` (`project_id`),
  ADD KEY `idx_block_code` (`block_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blocks`
--
ALTER TABLE `blocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blocks`
--
ALTER TABLE `blocks`
  ADD CONSTRAINT `blocks_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
