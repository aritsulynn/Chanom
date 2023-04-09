DROP DATABASE IF EXISTS Chanom;
CREATE DATABASE Chanom;

USE Chanom;
CREATE TABLE administrator (
	username VARCHAR(50) PRIMARY KEY,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    birthdate DATE NOT NULL,
    email VARCHAR(50) NOT NULL
);

CREATE TABLE logininfo (
	username VARCHAR(50),
    pass_word VARCHAR(50) NOT NULL,
    loginLog DATETIME,
    PRIMARY KEY (username),
    FOREIGN KEY (username) REFERENCES administrator(username)
);

CREATE TABLE product (
	pID INT PRIMARY KEY,
    pName VARCHAR(50) NOT NULL,
    pType VARCHAR(50) NOT NULL,
    topping VARCHAR(50),
    rating INT NOT NULL,
    price INT NOT NULL,
    CHECK (rating >= 0 AND rating <= 5)  
);

INSERT INTO product
VALUES (1, "Classic Bubble Milk Tea", "Bubble Milk Tea", "Brown Sugar", 5, 60),
(2, "Chocolate Bubble Milk", "Bubble Milk", "Black Pearl", 5, 60),
(3, "Matcha Bubble Tea", "Bubble Milk Tea", "Black Pearl", 5, 60),
(4, "Oolong Milk Tea", "Bubble Milk Tea", "Grass Jelly", 4, 60),
(5, "Strawberry Yoghurt Frappe", "Fruit Yoghurt Frappe", NULL, 3, 55);

INSERT INTO administrator
VALUES ("Kritchanapat", "Kritchanapat", "Junju", "2003-05-26", "kritchanapat.jun@student.mahidol.edu"),
("Thitiwut", "Thitiwut", "Harnphatcharapanukorn", "2003-04-08", "thitiwutharn@gmail.com"),
("Sirasit", "Sirasit", "Puangpathanachai", "2003-01-18", "sirasit.pun@student.mahidol.edu"),
("thanawat", "Thanawat", "Jarusuthirug", "2002-02-27", "sirasit.pun@student.mahidol.edu"),
("bhubodin", "Bhubodin", "Somwhang", "2002-02-27", "bhubodin.som@student.mahidol.edu");

INSERT INTO logininfo
VALUES ("Thitiwut", "Bosszahahaha55566", NULL),
("Kritchanapat", "Earthza007", NULL);

