CREATE TABLE accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    game_type VARCHAR(50) NOT NULL,
    description TEXT,
    status ENUM('đã bán', 'chưa bán') DEFAULT 'chưa bán',
    account_information VARCHAR(100),
    img_url TEXT,
    username VARCHAR(100),
    password VARCHAR(100),
    price INT NOT NULL,
    discount_price INT,
    discount_note VARCHAR(255),
    discount_expire_at DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE accounts_lq_details (
    account_lq_id INT PRIMARY KEY,
    `rank` VARCHAR(50),
    level INT,
    hero_count INT,
    skin_count INT,
    FOREIGN KEY (account_lq_id) REFERENCES accounts(account_id) ON DELETE CASCADE
);

CREATE TABLE account_ww_details (
    account_ww_id INT PRIMARY KEY,
    server VARCHAR(50),
    union_level INT,
    limited_characters TEXT,
    limited_weapons TEXT,
    premium_currency VARCHAR(100),
    login_method VARCHAR(100),
    FOREIGN KEY (account_ww_id) REFERENCES accounts(account_id) ON DELETE CASCADE
);

CREATE TABLE account_gi_details (
    account_gi_id INT PRIMARY KEY,
    server VARCHAR(50),
    adventure_rank INT,
    world_level INT,
    limited_characters TEXT,
    limited_weapons TEXT,
    primogems INT,
    intertwined_fate INT,
    acquaint_fate INT,
    login_method VARCHAR(100),
    FOREIGN KEY (account_gi_id) REFERENCES accounts(account_id) ON DELETE CASCADE
);

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    isAdmin BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    locked_at DATETIME DEFAULT NULL,
    last_login DATETIME DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE users
ADD COLUMN avatar_url VARCHAR(255);

CREATE TABLE otp_codes (
  otp_id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  code VARCHAR(6) NOT NULL,
  expires_at DATETIME NOT NULL
);

CREATE TABLE contact_messages (
  contact_messages_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
  cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  account_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE
);

CREATE TABLE orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  order_code VARCHAR(50) NOT NULL UNIQUE, -- Mã đơn cho người dùng (hiện ra ngoài)
  total_amount INT NOT NULL,
  status ENUM('pending', 'paid', 'cancelled') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(user_id)
);


INSERT INTO accounts (code, game_type, description, status, account_information, img_url, username, password, price, discount_price, discount_note, discount_expire_at) VALUES
('LQ001', 'LienQuan', 'Acc rank cao, nhiều tướng', 'chưa bán', 'Acc VIP', 'https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/191/191-bigskin-8.jpg', 'userlq1', 'pass1', 1000000, 900000, 'Giảm 10%', '2025-12-31'),
('LQ002', 'LienQuan', 'Acc mới, ít tướng', 'đã bán', 'Acc mới tạo', 'https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/191/191-bigskin-8.jpg?1', 'userlq2', 'pass2', 200000, NULL, NULL, NULL),
('LQ003', 'LienQuan', 'Acc skin đẹp', 'chưa bán', 'Nhiều skin', 'https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/191/191-bigskin-8.jpg?2', 'userlq3', 'pass3', 1200000, 1100000, 'Giảm 10%', '2025-11-30'),
('GI001', 'Genshin', 'Acc AR 50, đồ đẹp', 'chưa bán', 'Acc full tính năng', 'https://tse3.mm.bing.net/th/id/OIP.vCe8mQxdYrtKCd6E3JZRsAHaEK?rs=1&pid=ImgDetMain', 'usergi1', 'passgi1', 3000000, 2800000, 'Sale', '2025-10-15'),
('GI002', 'Genshin', 'Acc AR 20, ít đồ', 'đã bán', 'Acc mới', 'https://tse3.mm.bing.net/th/id/OIP.vCe8mQxdYrtKCd6E3JZRsAHaEK?rs=1&pid=ImgDetMain', 'usergi2', 'passgi2', 1500000, NULL, NULL, NULL),
('WW001', 'WutheringWaves', 'Acc level cao', 'chưa bán', 'Acc VIP WW', 'https://i.ytimg.com/vi/K_zyygLvmIw/maxresdefault.jpg', 'userww1', 'passww1', 2500000, 2200000, 'Giảm 12%', '2025-09-30'),
('WW002', 'WutheringWaves', 'Acc mới tạo', 'chưa bán', 'Acc mới WW', 'https://i.ytimg.com/vi/K_zyygLvmIw/maxresdefault.jpg', 'userww2', 'passww2', 800000, NULL, NULL, NULL),
('LQ004', 'LienQuan', 'Acc rank trung bình', 'chưa bán', 'Acc rank 10', 'https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/191/191-bigskin-8.jpg?3', 'userlq4', 'pass4', 700000, NULL, NULL, NULL),
('LQ005', 'LienQuan', 'Acc rank cao', 'chưa bán', 'Nhiều skin hiếm', 'https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/191/191-bigskin-8.jpg?4', 'userlq5', 'pass5', 1500000, 1400000, 'Giảm 7%', '2025-11-15'),
('GI003', 'Genshin', 'Acc AR 30, đồ khá', 'chưa bán', 'Acc trung bình', 'https://tse3.mm.bing.net/th/id/OIP.vCe8mQxdYrtKCd6E3JZRsAHaEK?rs=1&pid=ImgDetMain', 'usergi3', 'passgi3', 2000000, NULL, NULL, NULL),
('GI004', 'Genshin', 'Acc AR 10', 'chưa bán', 'Acc mới', 'https://tse3.mm.bing.net/th/id/OIP.vCe8mQxdYrtKCd6E3JZRsAHaEK?rs=1&pid=ImgDetMain', 'usergi4', 'passgi4', 1200000, NULL, NULL, NULL),
('WW003', 'WutheringWaves', 'Acc level thấp', 'chưa bán', 'Acc WW mới', 'https://i.ytimg.com/vi/K_zyygLvmIw/maxresdefault.jpg', 'userww3', 'passww3', 900000, NULL, NULL, NULL),
('WW004', 'WutheringWaves', 'Acc level trung bình', 'chưa bán', 'Acc WW khá', 'https://i.ytimg.com/vi/K_zyygLvmIw/maxresdefault.jpg', 'userww4', 'passww4', 1300000, 1200000, 'Sale nhỏ', '2025-10-01'),
('LQ006', 'LienQuan', 'Acc có skin', 'chưa bán', 'Skin đẹp', 'https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/191/191-bigskin-8.jpg?5', 'userlq6', 'pass6', 1100000, NULL, NULL, NULL),
('LQ007', 'LienQuan', 'Acc rank cao', 'chưa bán', 'Acc VIP', 'https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/191/191-bigskin-8.jpg?6', 'userlq7', 'pass7', 2000000, 1800000, 'Giảm 10%', '2025-12-01'),
('GI005', 'Genshin', 'Acc AR 40', 'chưa bán', 'Acc nhiều đồ', 'https://tse3.mm.bing.net/th/id/OIP.vCe8mQxdYrtKCd6E3JZRsAHaEK?rs=1&pid=ImgDetMain', 'usergi5', 'passgi5', 2500000, NULL, NULL, NULL),
('GI006', 'Genshin', 'Acc AR 25', 'đã bán', 'Acc trung bình', 'https://tse3.mm.bing.net/th/id/OIP.vCe8mQxdYrtKCd6E3JZRsAHaEK?rs=1&pid=ImgDetMain', 'usergi6', 'passgi6', 1800000, NULL, NULL, NULL),
('WW005', 'WutheringWaves', 'Acc WW VIP', 'chưa bán', 'Acc cao cấp', 'https://i.ytimg.com/vi/K_zyygLvmIw/maxresdefault.jpg', 'userww5', 'passww5', 2800000, 2600000, 'Khuyến mãi', '2025-11-30'),
('LQ008', 'LienQuan', 'Acc rank thấp', 'chưa bán', 'Acc cơ bản', 'https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/191/191-bigskin-8.jpg?7', 'userlq8', 'pass8', 400000, NULL, NULL, NULL),
('GI007', 'Genshin', 'Acc AR 15', 'chưa bán', 'Acc mới', 'https://tse3.mm.bing.net/th/id/OIP.vCe8mQxdYrtKCd6E3JZRsAHaEK?rs=1&pid=ImgDetMain', 'usergi7', 'passgi7', 1000000, NULL, NULL, NULL);

INSERT INTO accounts_lq_details (account_lq_id, `rank`, level, hero_count, skin_count) VALUES
(1, 'Cao Thủ', 30, 100, 50),
(2, 'Mới', 5, 10, 3),
(3, 'Thần Tượng', 28, 120, 60),
(8, 'Trung Bình', 15, 50, 20),
(9, 'Cao Thủ', 32, 110, 55),
(14, 'Trung Bình', 20, 70, 25),
(15, 'Cao Thủ', 27, 90, 45),
(18, 'Thấp', 7, 15, 5);


INSERT INTO account_ww_details (account_ww_id, server, union_level, limited_characters, limited_weapons, premium_currency, login_method) VALUES
(6, 'Server WW1', 80, 'CharWW1, CharWW2', 'WeaponWW1, WeaponWW2', '5000 Coins', 'Email'),
(7, 'Server WW2', 45, 'CharWW3', 'WeaponWW3', '2000 Coins', 'Facebook'),
(12, 'Server WW3', 25, 'CharWW4', 'WeaponWW4', '1000 Coins', 'Google'),
(13, 'Server WW4', 50, 'CharWW5, CharWW6', 'WeaponWW5', '3000 Coins', 'Email'),
(16, 'Server WW5', 85, 'CharWW7', 'WeaponWW6', '7000 Coins', 'Facebook'),
(19, 'Server WW6', 90, 'CharWW8, CharWW9', 'WeaponWW7', '8000 Coins', 'Google');


INSERT INTO account_gi_details (account_gi_id, server, adventure_rank, world_level, limited_characters, limited_weapons, primogems, intertwined_fate, acquaint_fate, login_method) VALUES
(4, 'Server GI1', 50, 60, 'CharGI1, CharGI2', 'WeaponGI1, WeaponGI2', 5000, 300, 150, 'Email'),
(5, 'Server GI2', 40, 50, 'CharGI3', 'WeaponGI3', 4000, 200, 120, 'Facebook'),
(10, 'Server GI3', 30, 40, 'CharGI4, CharGI5', 'WeaponGI4', 3500, 150, 100, 'Google'),
(11, 'Server GI4', 35, 45, 'CharGI6', 'WeaponGI5, WeaponGI6', 3700, 180, 110, 'Email'),
(17, 'Server GI5', 25, 35, 'CharGI7', 'WeaponGI7', 3200, 130, 90, 'Facebook'),
(20, 'Server GI6', 45, 55, 'CharGI8, CharGI9', 'WeaponGI8', 4800, 280, 140, 'Google');


INSERT INTO users (username, password, email, isAdmin, is_active, locked_at, last_login, created_at, updated_at)
VALUES
('admin', 'admin123', 'admin@example.com', TRUE, TRUE, NULL, '2025-06-04 09:15:00', '2025-01-01 08:00:00', '2025-06-04 09:15:00'),
('johndoe', '123456', 'john@example.com', FALSE, TRUE, NULL, '2025-06-03 14:32:00', '2025-02-14 10:00:00', '2025-06-03 14:32:00'),
('janedoe', '123456', 'jane@example.com', FALSE, FALSE, '2025-05-20 08:00:00', '2025-05-19 18:45:00', '2025-02-15 11:20:00', '2025-05-20 08:00:00'),
('alice', 'alicepass', 'alice@example.com', FALSE, TRUE, NULL, '2025-06-01 20:00:00', '2025-03-01 12:00:00', '2025-06-01 20:00:00'),
('bob', 'bobpass', 'bob@example.com', FALSE, TRUE, NULL, '2025-06-02 07:50:00', '2025-03-10 15:10:00', '2025-06-02 07:50:00'),
('charlie', 'qwerty', 'charlie@example.com', FALSE, FALSE, '2025-04-01 09:00:00', '2025-03-30 23:00:00', '2025-01-15 09:30:00', '2025-04-01 09:00:00'),
('david', 'davidpass', 'david@example.com', FALSE, TRUE, NULL, '2025-06-04 06:20:00', '2025-03-25 08:00:00', '2025-06-04 06:20:00'),
('eva', 'evaeva', 'eva@example.com', FALSE, TRUE, NULL, '2025-06-03 11:00:00', '2025-04-01 10:10:00', '2025-06-03 11:00:00'),
('frank', 'frankie', 'frank@example.com', FALSE, FALSE, '2025-05-01 12:00:00', '2025-04-30 23:59:00', '2025-02-01 08:30:00', '2025-05-01 12:00:00'),
('grace', 'grace123', 'grace@example.com', FALSE, TRUE, NULL, '2025-06-04 13:00:00', '2025-05-05 17:20:00', '2025-06-04 13:00:00');


select * from accounts
select * from users

