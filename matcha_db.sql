-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3307
-- Generation Time: Apr 04, 2017 at 08:54 PM
-- Server version: 5.5.42
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `matcha_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `blocks`
--

CREATE TABLE `blocks` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `targetId` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `userId` int(11) NOT NULL,
  `profil` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `name`, `userId`, `profil`) VALUES
(43, '../static/gallery/zezette/hipster hairstyles tumblr for girls 1.jpg', 8, 1),
(44, '../static/gallery/Susy/asian-choi-seo-hee-cute-fashion-girl-Favim.com-400679.jpg', 9, 1),
(45, '../static/gallery/July/short-girl-hairstyles-tumblr-1.jpg', 10, 1),
(46, '../static/gallery/Brand0N/2f084710a795d10490d1e6cd487d5fe6.jpg', 11, 1),
(47, '../static/gallery/TheGrinch/tumblr_mgvqups3fo1qlbteho1_500_large.jpg', 12, 1),
(48, '../static/gallery/totoson/a4488e8df6905a04aba2d86ec5113c61.jpg', 13, 1),
(49, '../static/gallery/vaness/c79cfd68653bfb46ecd7b0b96401708a.jpg', 14, 1),
(50, '../static/gallery/Lorylove/74285-Korean-Red-Hair.png', 15, 1),
(51, '../static/gallery/kelly_d/4372b0076dc8f9769b848534b587b6a7.jpg', 16, 1),
(52, '../static/gallery/sojisub/so-ji-sub.jpg', 17, 1),
(53, '../static/gallery/klove/Korean-Men-Hairstyle.jpg', 18, 1),
(57, '../static/gallery/okok/sfv.jpg', 20, 1),
(58, '../static/gallery/okok/519032-cubes-wallpaper.jpg', 20, 0),
(60, '../static/gallery/Smil3/Smile-14.jpg', 21, 1),
(61, '../static/gallery/sojisub/7cda612be2938fa16f36bdcf18aed4bd.jpg', 17, 0),
(62, '../static/gallery/sojisub/foto-aktor-ganteng-korea-so-ji-sub-4.jpg', 17, 0),
(63, '../static/gallery/sojisub/so_ji_seob_4250.jpg', 17, 0),
(64, '../static/gallery/sojisub/So-Ji-Sub-veut-tomber-amoureux-cette-annee-3.jpg', 17, 0),
(65, '../static/gallery/BG_du_68/BG_du_68_1490808128240', 23, 1),
(66, '../static/gallery/BG_du_68/BG_du_68_1490808176662', 23, 0),
(67, '../static/gallery/BG_du_68/BG_du_68_1490808182371', 23, 0),
(68, '../static/gallery/Caro94/Caro94_1490808451901', 24, 0),
(69, '../static/gallery/Caro94/Caro94_1490808457483', 24, 1),
(70, '../static/gallery/Acoops/Acoops_1490808916548', 25, 1),
(71, '../static/gallery/Kimmy5/Kimmy5_1490809051259', 26, 0),
(72, '../static/gallery/Kimmy5/Kimmy5_1490809059978', 26, 1),
(73, '../static/gallery/DannyMod/DannyMod_1490809220963', 27, 0),
(74, '../static/gallery/DannyMod/DannyMod_1490809224997', 27, 1),
(75, '../static/gallery/PinkLady3/PinkLady3_1490809706476', 28, 0),
(76, '../static/gallery/PinkLady3/PinkLady3_1490809711675', 28, 0),
(77, '../static/gallery/PinkLady3/PinkLady3_1490809717964', 28, 1),
(78, '../static/gallery/Acoops/Acoops_1490810234658', 25, 0),
(79, '../static/gallery/Acoops/Acoops_1490810240483', 25, 0);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `targetId` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `userId`, `targetId`) VALUES
(3, 20, 10),
(5, 25, 23),
(6, 20, 24),
(17, 8, 20);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `senderId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `message` varchar(600) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `senderId`, `receiverId`, `message`) VALUES
(1, 20, 8, 'wfewefewrf'),
(2, 20, 8, 't la ?'),
(3, 8, 20, 'oui'),
(4, 20, 8, 'merde'),
(5, 8, 20, 'frfergreg'),
(6, 20, 8, 're'),
(7, 8, 20, 're'),
(8, 20, 8, 're'),
(9, 8, 20, 're'),
(10, 20, 8, 're'),
(11, 8, 20, 're ');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `targetId` int(11) NOT NULL,
  `eventName` varchar(50) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `userId`, `targetId`, `eventName`, `status`) VALUES
(17, 8, 20, 'Like', 1),
(18, 10, 20, 'Like', 1),
(19, 8, 20, 'LikeBack', 1),
(20, 8, 20, 'Unlike', 1),
(21, 8, 20, 'LikeBack', 1),
(22, 8, 20, 'Unlike', 1),
(23, 8, 20, 'LikeBack', 1),
(24, 20, 8, 'Unlike', 1),
(25, 8, 20, 'Unlike', 1),
(26, 8, 20, 'Like', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `tagId` int(11) NOT NULL,
  `name` varchar(70) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=615 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`tagId`, `name`) VALUES
(13, '#animals'),
(6, '#astrology'),
(469, '#bike'),
(3, '#birdwatching'),
(468, '#candies'),
(552, '#cars'),
(445, '#cats'),
(1, '#cinema'),
(11, '#computer'),
(5, '#cooking'),
(4, '#dancing'),
(475, '#dog'),
(489, '#dramas'),
(444, '#eyes'),
(8, '#fashion'),
(435, '#fdeerfgre'),
(589, '#fruits'),
(554, '#girls'),
(537, '#japan'),
(559, '#jul'),
(526, '#kpop'),
(455, '#leschtis'),
(454, '#lesmarseillais'),
(12, '#litterature'),
(490, '#models'),
(2, '#music'),
(486, '#noddles'),
(473, '#photography'),
(456, '#princedelamour'),
(474, '#scrapbooking'),
(476, '#sea'),
(477, '#sex'),
(488, '#singing'),
(566, '#skateboarding'),
(525, '#smile'),
(568, '#sport'),
(478, '#sun'),
(567, '#surf'),
(551, '#theater'),
(553, '#tunning'),
(463, '#usa'),
(467, '#videogames');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `age` int(5) DEFAULT NULL,
  `login` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(300) NOT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `bio` text,
  `sexpref` varchar(20) DEFAULT NULL,
  `geoloc` varchar(10) NOT NULL DEFAULT 'yes',
  `position` varchar(40) DEFAULT NULL,
  `lastConnection` varchar(100) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `age`, `login`, `email`, `password`, `gender`, `bio`, `sexpref`, `geoloc`, `position`, `lastConnection`) VALUES
(8, 'loulou', 'relou', 27, 'zezette', 'tfytft@huihiu.com', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Female', 'Hi my name is loulou', 'Bisexual', 'yes', '48.785,2.021', 'Apr 4, 2017'),
(9, 'Susan', 'Marshall', 22, 'Susy', 'susan@gmail.com', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Female', 'Hi my name is Susan, I love birds !', 'Straight', 'no', '48.7664,2.0341', 'Mar 28, 2017'),
(10, 'Juliette', 'Wagner', 18, 'July', 'july@july.com', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Female', 'Hi my name is Juliette, I love fashion etc....', 'Bisexual', 'yes', '48.769,2.166', 'Mar 28, 2017'),
(11, 'Brandon', 'WALLS', 27, 'Brand0N', 'brandon@bboy.uk', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Male', 'Hi my name si Brandon !!', 'Bisexual', 'yes', '52.257,0.166', 'Mar 28, 2017'),
(12, 'Ilian', 'DIALO', 18, 'TheGrinch', 'Ilian@mail.com', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Male', 'Hi my name is Ilian !', 'Straight', 'no', '48.7664,2.0341', 'Mar 28, 2017'),
(13, 'Thomas', 'Wilson', 29, 'totoson', 'toto@mail.com', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Male', 'Hi my name si Thomas, but call me Toto :D', 'Gay', 'yes', '41.955,12.405', 'Mar 28, 2017'),
(14, 'Vanessa', 'Clarks', 19, 'vaness', 'vaness@mail.com', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Female', 'My name is Vaness, nice to meet you :)', 'Straight', 'yes', '48.854,2.341', 'Mar 28, 2017'),
(15, 'Lory', 'Borden', 20, 'Lorylove', 'lory@mail.com', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Female', 'Hi my name is Lory, I''m 20 and I love sea, sex and sun ;)', 'Bisexual', 'no', '48.7664,2.0341', 'Mar 29, 2017'),
(16, 'Kelly', 'DOAN', 24, 'kelly_d', 'kelly@mail.com', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Female', 'My name is Kelly, Nice to meet you...', 'Straight', 'yes', '51.562,-0.073', 'Mar 28, 2017'),
(17, 'So', 'Ji-Sub', 36, 'sojisub', 'sojisub@mail.kr', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Male', 'Im a famouse actor, hope I will find here the love of my life x3', 'Straight', 'yes', '37.595,127.083', 'Mar 28, 2017'),
(18, 'Park', 'ChaMyung', 24, 'klove', 'klove@mail.com', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Male', 'Hi Im Park, I love singing and dancing, and hope you too ;)', 'Straight', 'yes', '39.031,125.74', 'Mar 28, 2017'),
(19, 'Dan', 'LEE', 36, 'DanLee', 'danlee@mail.com', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Male', 'Hi Im a professionnal model and I love photography...', 'Bisexual', 'no', '48.7664,2.0341', 'Mar 28, 2017'),
(20, 'okok', 'okok', 42, 'okok', 'okok@mail.com', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Male', 'Hi my name is OKOK :)', 'Bisexual', 'yes', '48.891,2.231', 'Apr 4, 2017'),
(21, 'Suzanne', 'MILLER', 20, 'Smil3', 'smile@mail.com', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Female', 'My name is Suzanne, I love life and smile, juste be happy :)', 'Gay', 'yes', '51.589,-0.098', 'Mar 28, 2017'),
(22, 'plpl', 'plpl', 21, 'plpl', 'plpl@plpl.pl', '$2a$10$p1oU4fo8HVhn/.PHm84k/.577gEnRCQ2o8qs5fgsb0gVR3oTxbR7C', 'Male', 'BLABALBLA', 'Bisexual', 'yes', '48.891985999999996,2.319287', 'Mar 28, 2017'),
(23, 'Gege', 'LeBG', 26, 'BG_du_68', 'bgdu58@mail.com', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Male', 'Hi there, I''m a big fan of cars, my favorite one is the Huyndai Veloster, you can see it on my profile ;)', 'Straight', 'yes', '49.072,6.981', 'Mar 29, 2017'),
(24, 'Caroline', 'HOOKS', 23, 'Caro94', 'caro@mail.com', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Female', 'Hi my name is Caro, I love life and I hope to meet a lot of people like me! See ya guys !', 'Bisexual', 'yes', '39.992,-95.676', 'Mar 29, 2017'),
(25, 'Alice', 'COOPER', 18, 'Acoops', 'alice@mail.com', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Female', 'My name is Alice, I love skateboard and sport in general. Hope I could find interesting people here, peace --<@', 'Straight', 'yes', '37.873,-121.867', 'Mar 29, 2017'),
(26, 'Kimmy', 'HOLMAS', 19, 'Kimmy5', 'kimmy@mail.com', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Female', 'I don''t know what to say, just talk with me :)', 'Bisexual', 'yes', '33.668,-110.617', 'Mar 29, 2017'),
(27, 'Danny', 'DADOG', 22, 'DannyMod', 'danny@mail.com', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Male', 'Hi I''m a professional model living in Paris, please contact me if you need some infos about me or if you want to work with me. \r\nThank you..', 'Bisexual', 'yes', '48.863,2.3', 'Mar 29, 2017'),
(28, 'Paula', 'MORENNA', 19, 'PinkLady3', 'pinklady@mail.com', '$2a$10$p1oU4fo8HVhn/.PHm84k/.7voglshhnyjnfGdk5etBnHm8H.kS5YC', 'Female', 'Hello everyone! Im Pink Lady, like the apple :)', 'Gay', 'yes', '48.851,2.314', 'Mar 29, 2017');

-- --------------------------------------------------------

--
-- Table structure for table `user_tags`
--

CREATE TABLE `user_tags` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=229 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_tags`
--

INSERT INTO `user_tags` (`id`, `userId`, `tagId`) VALUES
(25, 21, 525),
(26, 21, 478),
(27, 21, 8),
(28, 21, 445),
(54, 22, 490),
(55, 22, 2),
(56, 22, 486),
(57, 22, 454),
(58, 22, 12),
(70, 9, 526),
(71, 9, 8),
(72, 9, 490),
(73, 9, 486),
(74, 10, 8),
(75, 10, 3),
(76, 10, 478),
(77, 10, 476),
(78, 10, 477),
(79, 15, 489),
(80, 15, 526),
(81, 15, 537),
(82, 15, 473),
(83, 14, 8),
(84, 14, 473),
(85, 14, 474),
(86, 14, 525),
(87, 16, 473),
(88, 16, 488),
(89, 16, 2),
(90, 16, 8),
(91, 17, 1),
(92, 17, 526),
(93, 17, 8),
(94, 17, 473),
(95, 17, 551),
(99, 11, 8),
(100, 11, 473),
(101, 11, 13),
(102, 11, 477),
(103, 11, 476),
(104, 11, 478),
(105, 13, 490),
(106, 13, 473),
(107, 13, 12),
(108, 13, 8),
(109, 13, 4),
(110, 13, 5),
(111, 13, 456),
(112, 18, 526),
(113, 18, 4),
(114, 18, 488),
(115, 18, 473),
(116, 18, 5),
(117, 18, 445),
(118, 12, 473),
(119, 12, 490),
(120, 12, 476),
(121, 12, 477),
(122, 12, 478),
(123, 12, 4),
(124, 12, 475),
(128, 8, 445),
(129, 8, 456),
(130, 8, 454),
(131, 8, 455),
(132, 8, 474),
(133, 8, 488),
(166, 23, 552),
(167, 23, 553),
(168, 23, 554),
(169, 23, 476),
(170, 23, 477),
(171, 23, 478),
(172, 23, 490),
(173, 23, 559),
(174, 24, 8),
(175, 24, 445),
(176, 24, 468),
(177, 24, 473),
(178, 24, 474),
(179, 24, 463),
(180, 25, 566),
(181, 25, 567),
(182, 25, 568),
(183, 25, 2),
(184, 25, 478),
(185, 25, 463),
(186, 26, 559),
(187, 26, 486),
(188, 26, 476),
(189, 26, 488),
(190, 26, 463),
(191, 26, 13),
(192, 26, 445),
(193, 26, 4),
(194, 26, 5),
(195, 27, 526),
(196, 27, 490),
(197, 27, 8),
(198, 27, 444),
(199, 27, 445),
(200, 27, 488),
(201, 27, 525),
(202, 27, 467),
(203, 28, 589),
(204, 28, 13),
(205, 28, 468),
(206, 28, 445),
(207, 28, 473),
(208, 28, 474),
(219, 20, 13),
(220, 20, 3),
(221, 20, 477),
(222, 20, 478),
(223, 20, 476),
(224, 20, 455),
(225, 20, 526),
(226, 20, 445),
(227, 20, 456),
(228, 20, 454);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tagId`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `login` (`login`);

--
-- Indexes for table `user_tags`
--
ALTER TABLE `user_tags`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blocks`
--
ALTER TABLE `blocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=80;
--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `tagId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=615;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `user_tags`
--
ALTER TABLE `user_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=229;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
