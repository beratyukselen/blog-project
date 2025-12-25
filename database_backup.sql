-- MySQL dump 10.13  Distrib 8.0.44, for macos15 (arm64)
--
-- Host: localhost    Database: blog_db
-- ------------------------------------------------------
-- Server version	9.5.0

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '8fb9d634-d3b3-11f0-a948-d4ace05f3904:1-79';

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Genel','2025-12-09 23:02:56'),(2,'Teknoloji','2025-12-16 21:44:30'),(3,'Yazılım','2025-12-16 21:44:30'),(4,'Yaşam','2025-12-16 21:44:30'),(5,'Spor','2025-12-16 21:44:30'),(6,'Seyahat','2025-12-16 21:44:30'),(7,'Sanat','2025-12-16 21:44:30');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Melike çok güzel bir yazı olmuş, ellerine sağlık...',1,6,'2025-12-13 15:43:40'),(2,'Teşekkür ederim Berat.',3,6,'2025-12-13 16:08:44'),(6,'Kesinlikle sana katılıyorum Berat!',1,7,'2025-12-17 14:43:20'),(9,'Helal olsun kız sana zilli....',1,9,'2025-12-18 23:39:55');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`post_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (2,1,4,'2025-12-16 21:36:13'),(3,1,3,'2025-12-16 21:36:17'),(4,3,6,'2025-12-16 21:36:27'),(9,1,7,'2025-12-17 14:42:58'),(10,3,7,'2025-12-17 14:44:00'),(12,3,9,'2025-12-18 23:04:47'),(15,1,9,'2025-12-18 23:39:38'),(18,1,6,'2025-12-18 23:40:13'),(19,1,11,'2025-12-25 19:02:55');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (3,'İlk Blog Yazım','Bu benim fullstack projemdeki ilk yazım!','http://localhost:3000/uploads/image-1766100886126-969119607.png',1,1,'2025-12-09 23:03:12'),(4,'Bu benim ilk blog yazım','Ben yeni bir projeye başladım ve bu benim bu projedeki ilk blog yazım çok heyecanlıyım.','http://localhost:3000/uploads/image-1766100869560-620664347.png',1,1,'2025-12-11 15:57:22'),(6,'Old Faithful','Old Faithful , Amerika Birleşik Devletleri, Wyoming\'deki Yellowstone Ulusal Parkı\'ndaki bir gayzerdir. 1870 yılında Washburn-Langford-Doane Seferi sırasında seçildi ve parkta adı geçen ilk gayzer oldu.[1][2] Oldukça öngörülebilir bir jeotermal özelliktir ve 2000\'den beri her 44 dakikada bir ila iki saatte bir patlamıştır.\r\n\r\n18 Eylül 1870 günü, Washburn-Langford-Doane Keşif Gezisi üyeleri, Kepler Şelaleleri\'nden Firehole Nehri\'nden aşağıya doğru indi ve Yukarı Gayzer Havzasına gittiler. Gördükleri ilk gayzer Old Faithful\'du. Nathaniel P. Langford, keşif gezisiyle ilgili açıklamasında şunları yazdı: Kaldığımız süre boyunca düzenli aralıklarla dokuz kez fışkırdı, on beş ila yirmi dakika süren her fışkırmada doksan ila yüz yirmi beş fit arasında kaynar su sütunları atıldı. Biz ona \"Old Faithful\" adını verdik. Parkın ilk günlerinde Old Faithful genellikle çamaşırhane olarak kullanılıyordu: Old Faithful bazen bir çamaşırhaneye çevrilerek bozulur. Sükunet sırasında kratere yerleştirilen giysiler, püskürme gerçekleştiğinde iyice yıkanarak dışarı atılır. General Sheridan\'ın adamları 1882\'de keten ve pamuklu kumaşların suyun etkisinden zarar görmediğini, ancak yünlü giysilerin paramparça olduğunu keşfettiler.\r\n\r\n1983 ile 1994 yılları arasında, sıcaklık ve basınç ölçüm cihazları ve video ekipmanı içeren dört sonda Old Faithful\'a indirildi. Sondalar 72 fit (22 m) derinliğe daldırıldı. Bu derinlikteki suyun sıcaklık ölçümleri 244 °F (118 °C) olarak çıktı Video probları maksimum 13 metre derinliğe indirildi. Gözlemlenen işlemlerden bazıları, yukarıdan gelen soğuk havanın aşağıdan gelen ısıtılmış hava ile etkileşiminden kaynaklanan sis oluşumunu, boruya giren ve aşağıdan genişleyen suyun yeniden doldurma işlemlerini ve 265 °F (129 °C) kadar çıkan aşırı ısıtılmış buharın girişini içerir.','http://localhost:3000/uploads/image-1766100930221-216485538.JPG',3,4,'2025-12-11 19:34:58'),(7,'Swift Hakkında','Swift, C ve Objective-C yazılım dilleri tabanlı oluşturulmuş ve C ve Objective-C dillerinin karmaşından kurtarılarak hazırlanmış bir yazılım dilidir. Genel programlama yapısından kopmadan, esnek ve kolay kod yazılabilecek şekilde tasarlanmış mimariye sahiptir. Uygulama geliştiriciler, iOS, MacOS, WatchOS ve tvOS ürünlerine uygulama geliştirirken Cocoa ve Cocoa Touch uygulama katmanlarından faydalanırlar. Cocoa ve CocoaTouch uygulama katmanlarından konumuzun ilerleyen bölümlerinde daha detaylı bir şekilde bahsedeceğim. Swift yazılım dilinde bellek yönetimi olarak Automatic Reference Counting (ARC) sistemi kullanılmaktadır. Swift dili Objective-C dilini tamamen kapsamakta ve Objective-C ile yazılan tüm kodları, kütüphaneleri destekleyerek daha modern ve geliştirilmesi kolay bir yapıya ulaşmıştır.\r\n\r\nObjective-C dilinin aksine Swift yazılım geliştirmeye yeni başlayanlar için oldukça basit ve anlaşılabilir yapıdadır. Swift ile birlikte ortaya çıkan ve yazılım geliştirmeye yeni başlayanlar için yazılan kodun çıktısını anında gösterebilen yapıya sahip playgrounds uygulaması, geliştiricileri hem eğlendirmekte hem de hemen sonucu görmelerini sağlayarak iyi bir izlenim oluşturmaktadır.\r\n','http://localhost:3000/uploads/image-1766100831927-109001350.jpeg',1,3,'2025-12-16 21:57:02'),(9,'Fotoğraf yükleme denemesi','Eğer burası çalışırsa artık siteye post eklerken url yapıştırmak yerine direkt bilgisayardan dosya seçip fotoğraf ekleyebileceğim.','http://localhost:3000/uploads/image-1766091467300-931383113.JPG',3,1,'2025-12-18 20:57:47'),(11,'Amazon S3 Deneme','Amazon S3 depolama denemesidir.','https://berat-blog-projesi-resimleri.s3.eu-north-1.amazonaws.com/uploads/image-1766621133317-727582953.png',1,1,'2025-12-25 00:05:34');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `bio` text,
  `profile_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Berat Yükselen','berat@test.com','$2b$10$c5ogHMn1VsQgf4BZ.kyFj.r9IN3V1qZ9lc320pbSKewZ.OFiWdVlG','user','2025-12-09 15:04:32','Junior iOS & FullStack Developer','https://berat-blog-projesi-resimleri.s3.eu-north-1.amazonaws.com/uploads/profile_image-1766621317894-728267906.JPG'),(2,'Berat','berat1@test.com','$2b$10$mpBn56Hz7pEPmEou33df2.E.CwKLAYlSQ98pea6KhKhRUM73wzXhi','user','2025-12-09 18:31:41',NULL,NULL),(3,'Melike Yükselen','melike@test.com','$2b$10$gWbB6NUO0VRiMaEvShY7fOoNAS.4Y434Prw2.lJgBr9K0tyaiCYHW','user','2025-12-11 19:33:14','Junior QA Engineer',''),(4,'Salih Yükselen','salih@test.com','$2b$10$CmpjX9nEOMmcLcUKtAnqlOSoU3/k.COK5Qm/R8h3I1f8wMjOHvU.q','user','2025-12-17 23:27:49',NULL,NULL),(5,'berat123','berat3@test.com','$2b$10$7K/vnYmzf4yeJS5sRDfrmu3VofRt57p1EBEAiDjeKLeXiczms05NK','user','2025-12-17 23:41:50',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-26  2:04:02
