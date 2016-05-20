-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        10.1.8-MariaDB - mariadb.org binary distribution
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  9.1.0.4867
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出 nanpin 的数据库结构
DROP DATABASE IF EXISTS `nanpin`;
CREATE DATABASE IF NOT EXISTS `nanpin` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `nanpin`;


-- 导出  表 nanpin.tbl_menu 结构
DROP TABLE IF EXISTS `tbl_menu`;
CREATE TABLE IF NOT EXISTS `tbl_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m` int(11) NOT NULL,
  `c` int(11) DEFAULT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `sort` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 正在导出表  nanpin.tbl_menu 的数据：~21 rows (大约)
DELETE FROM `tbl_menu`;
/*!40000 ALTER TABLE `tbl_menu` DISABLE KEYS */;
INSERT INTO `tbl_menu` (`id`, `m`, `c`, `name`, `sort`) VALUES
	(1, 0, 0, '党群文化', 1),
	(2, 0, 0, '支部风采', 2),
	(3, 0, 0, '园区党建', 3),
	(4, 0, 0, '公益志愿', 4),
	(5, 0, 0, '时代先锋', 5),
	(6, 0, 0, '学习教育', 6),
	(7, 1, 1, '功能区域', 1),
	(8, 1, 2, '580驿站', 2),
	(9, 1, 3, '“3+1+X”联动', 3),
	(10, 1, 4, '群团活动', 4),
	(11, 2, 1, '我的成员', 1),
	(12, 2, 2, '区域党建', 2),
	(13, 2, 3, '积分管理', 3),
	(14, 2, 4, '组织生活', 4),
	(15, 3, 1, '我的颜值', 1),
	(16, 3, 2, '党建动态', 2),
	(17, 4, 1, '公益项目', 1),
	(18, 4, 2, '志愿团队', 2),
	(19, 5, 1, '书记项目', 1),
	(20, 5, 2, '“名企汇”书记沙龙', 2),
	(21, 5, 3, '身边之星', 3);
/*!40000 ALTER TABLE `tbl_menu` ENABLE KEYS */;


-- 导出  表 nanpin.tbl_news 结构
DROP TABLE IF EXISTS `tbl_news`;
CREATE TABLE IF NOT EXISTS `tbl_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `footer` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createtime` bigint(20) NOT NULL,
  `updatetime` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 导出  表 nanpin.tbl_user 结构
DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `salt` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 正在导出表  nanpin.tbl_user 的数据：~0 rows (大约)
DELETE FROM `tbl_user`;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` (`id`, `name`, `password`, `salt`) VALUES
	(1, 'admin', null, null);
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
