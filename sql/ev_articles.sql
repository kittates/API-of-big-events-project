/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 50510
 Source Host           : localhost:3306
 Source Schema         : my_db_01

 Target Server Type    : MySQL
 Target Server Version : 50510
 File Encoding         : 65001

 Date: 29/01/2024 20:26:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ev_articles
-- ----------------------------
DROP TABLE IF EXISTS `ev_articles`;
CREATE TABLE `ev_articles`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cover_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pub_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_delete` tinyint(1) NOT NULL,
  `cate_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of ev_articles
-- ----------------------------
INSERT INTO `ev_articles` VALUES (16, 'Meg', 'Meg_Griffin', '\\uploads\\1705918298424-655966934-Meg_Griffin.png', '2024-01-22 18:11:38.437', '已发布', 0, 11, 1);
INSERT INTO `ev_articles` VALUES (17, 'Brian', 'Brian_Griffin', '\\uploads\\1705918326415-614139413-Brian_Griffin.png', '2024-01-22 18:12:06.421', '草稿', 0, 22, 1);
INSERT INTO `ev_articles` VALUES (18, 'FamilyGuy', 'cartoon', '\\uploads\\1706530603213-212063718-Meg_Griffin.png', '2024-01-29 20:16:43.227', '已发布', 0, 101, 1);
INSERT INTO `ev_articles` VALUES (19, 'Brian', 'cartoon', '\\uploads\\1706530769120-750400918-Brian_Griffin.png', '2024-01-29 20:19:29.127', '草稿', 0, 102, 1);

SET FOREIGN_KEY_CHECKS = 1;
