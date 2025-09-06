-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 04, 2025 at 02:24 PM
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
-- Table structure for table `amenities`
--

CREATE TABLE `amenities` (
  `id` int(11) NOT NULL,
  `block_id` int(11) NOT NULL,
  `floor_number` int(11) NOT NULL DEFAULT 1,
  `amenity_name` varchar(100) NOT NULL,
  `amenity_type` enum('დარბაზი','შიდა აუზი','სპა','ლობი','კაფე ბარი','რესტორანი') NOT NULL,
  `coords` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(50) DEFAULT 'აქტიური',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `amenities`
--

INSERT INTO `amenities` (`id`, `block_id`, `floor_number`, `amenity_name`, `amenity_type`, `coords`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'დარბაზი A-1', 'დარბაზი', '1772,877,1772,963,1917,967,1917,877', NULL, 'აქტიური', '2025-09-04 11:45:42', '2025-09-04 11:47:57'),
(2, 1, 1, 'შიდა აუზი A-1', 'შიდა აუზი', '1770,877,1619,878,1510,858,1510,938,1619,967,1770,965', NULL, 'აქტიური', '2025-09-04 11:45:42', '2025-09-04 11:47:57'),
(3, 1, 1, 'სპა ცენტრი A-1', 'სპა', '1383,831,1380,902,1502,936,1502,856', NULL, 'აქტიური', '2025-09-04 11:45:42', '2025-09-04 11:47:57'),
(4, 1, 1, 'მთავარი ლობი A-1', 'ლობი', '1225,799,1227,861,1244,863,1376,900,1376,829,1244,800', NULL, 'აქტიური', '2025-09-04 11:45:42', '2025-09-04 11:47:57'),
(5, 1, 1, 'კაფე ბარი A-1', 'კაფე ბარი', '983,797,983,865,1225,863,1224,795', NULL, 'აქტიური', '2025-09-04 11:45:42', '2025-09-04 11:47:57'),
(6, 1, 1, 'რესტორანი A-1', 'რესტორანი', '340,780,340,855,968,867,966,801,561,794', NULL, 'აქტიური', '2025-09-04 11:45:42', '2025-09-04 11:47:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `amenities`
--
ALTER TABLE `amenities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_block_floor` (`block_id`,`floor_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `amenities`
--
ALTER TABLE `amenities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `amenities`
--
ALTER TABLE `amenities`
  ADD CONSTRAINT `amenities_ibfk_1` FOREIGN KEY (`block_id`) REFERENCES `blocks` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
