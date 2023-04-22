DROP DATABASE IF EXISTS Chanom;
CREATE DATABASE Chanom;

USE Chanom;
CREATE TABLE administrator (
	aID INT AUTO_INCREMENT,
	username VARCHAR(50),
    pass_word VARCHAR(50) NOT NULL,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    birthdate DATE NOT NULL,
    email VARCHAR(50) NOT NULL,
    PRIMARY KEY (aID,username)
);

CREATE TABLE product (
	pID INT PRIMARY KEY AUTO_INCREMENT,
    pName VARCHAR(50) NOT NULL,
    pType VARCHAR(50) NOT NULL,
    topping VARCHAR(50),
    rating INT NOT NULL,
    pDescription TEXT NOT NULL,
    pic1 VARCHAR(200) NOT NULL,
    pic2 VARCHAR(200) NOT NULL,
    pic3 VARCHAR(200) NOT NULL,
    price INT NOT NULL,
    CHECK (rating >= 0 AND rating <= 5)  
);

INSERT INTO product
VALUES (1, "Classic Bubble Milk Tea", "Bubble Milk Tea", "Brown Sugar", 5, "Indulge in the sweet and refreshing taste of our signature bubble tea! Made with premium tea leaves and topped with chewy tapioca pearls, this drink is the perfect treat to satisfy your sweet tooth. Choose from a variety of delicious flavors, such as classic milk tea or fruity passionfruit, and customize your drink with your choice of toppings, including fresh fruit and jelly. With each sip, you'll experience a burst of flavor and a delightful texture that's sure to leave you wanting more!", "https://drive.google.com/uc?export=view&id=108iRXvoO25WyWhpmzpqOFhj7iMx8tOlv", "https://drive.google.com/uc?export=view&id=1RyXXeWrmu6W2ZfF7ZLzpMIU5wEPypsz5", "https://drive.google.com/uc?export=view&id=1Sx5t_ldu7ELiiLpOWrG9-4UFgcs-bcKj", 60),
(2, "Chocolate Bubble Milk", "Bubble Milk", "Black Pearl", 5, "Indulge in the rich and creamy taste of our chocolate bubble milk tea! Made with premium tea leaves and blended with smooth, velvety chocolate, this drink is the ultimate treat for chocolate lovers. Topped with chewy tapioca pearls, every sip offers a delightful burst of chocolatey goodness and a satisfying texture. Customize your drink with your choice of toppings, such as whipped cream or chocolate chips, and enjoy the perfect balance of sweet and decadent flavors. Satisfy your chocolate cravings today with our delicious chocolate bubble milk tea!", "https://drive.google.com/uc?export=view&id=1DgjSclqKldXjVF1n0MpeksyiC6e_a0k3", "https://drive.google.com/uc?export=view&id=1vEG_yn6NccFrDGmqZ-9WNbPs4r75pjAg", "https://drive.google.com/uc?export=view&id=1Jnh8uMgCIHRC4gTarR1rgu17bnj4IyFI", 60),
(3, "Matcha Bubble Tea", "Bubble Milk Tea", "Black Pearl", 5, "Experience the delicate and refreshing taste of our matcha bubble green tea! Made with premium matcha powder and blended with high-quality green tea, this drink is the perfect combination of sweet and earthy flavors. Topped with chewy tapioca pearls, every sip offers a delightful burst of green tea goodness and a satisfying texture. Customize your drink with your choice of toppings, such as mochi or red bean, and enjoy a unique and delightful drinking experience." , "https://drive.google.com/uc?export=view&id=1vFTyJS-XXzdNVsRdt40GN7B8C1ndwAs_", "https://drive.google.com/uc?export=view&id=18ahdQMLNOGUrm1zOA0aeQmsUo2Gxvnxl", "https://drive.google.com/uc?export=view&id=14tw8rkzd2WU417NuMyqD7MNpYs7ODlLT", 60),
(4, "Oolong Milk Tea", "Bubble Milk Tea", "Grass Jelly", 4, "Indulge in the smooth and mellow taste of our oolong bubble milk tea! Made with premium oolong tea leaves and blended with creamy milk, this drink offers a unique balance of fragrant aroma and milky sweetness. Topped with chewy tapioca pearls, every sip offers a delightful burst of flavor and a satisfying texture. Customize your drink with your choice of toppings, such as grass jelly or aloe vera, and enjoy the perfect combination of refreshing and indulgent flavors. Whether you're an oolong tea fan or a bubble tea lover, this drink is a must-try for anyone looking for a delicious and unique taste sensation!" , "https://drive.google.com/uc?export=view&id=1V8e8AMK5Zb_BrHx45bAXMVEhE5uRHinf", "https://drive.google.com/uc?export=view&id=17gxFxP5y8lIK5T8b8b2BPXURTXzzM6og", "https://drive.google.com/uc?export=view&id=1HXKQs-zpNP-Y6L5UJyAaMUQ4TKxgetdm", 60),
(5, "Strawberry Yoghurt Frappe", "Fruit Yoghurt Frappe", "Grass Jelly", 3, "Indulge in the sweet and tangy taste of our Strawberry Yoghurt Frappe! Made with refreshing yoghurt and blended with fresh strawberries, this drink is the perfect balance of creamy and fruity flavors. Topped with whipped cream and strawberry sauce, every sip offers a delightful burst of flavor and a satisfying texture. Customize your drink with your choice of toppings, such as popping boba or strawberry jelly, and enjoy a unique and delightful drinking experience.", "https://drive.google.com/uc?export=view&id=1Od8G0gU9w9s1D9xkwakiVCp61ywR0Omk", "https://drive.google.com/uc?export=view&id=1IQ6VsDeRvWTgGUOZzU459twnEq2PRjAz", "https://drive.google.com/uc?export=view&id=1_O8LlpwzfiiNyEAR01Ww8ittt-pyt4nr", 55),
(6, "Thai Bubble Tea", "Bubble Milk Tea", "Black Pearl", 4, "Transport your taste buds to the streets of Thailand with our authentic Thai bubble tea. Made with premium ingredients and brewed to perfection, our bubble tea offers a unique blend of sweet and savory flavors that are sure to delight. From the first sip to the last, you'll experience the tantalizing taste of Thai tea combined with the chewy goodness of tapioca pearls. Come and try our signature bubble tea today and discover why it's the perfect way to refresh and recharge.", "https://drive.google.com/uc?export=view&id=1el-tSLDiO57qOTXqL6mlkMXogSths20p", "https://drive.google.com/uc?export=view&id=195SsgnZtO-K6HU12QZ07hEoPn3UlPiOu", "https://drive.google.com/uc?export=view&id=12_sY2eNS0rYvT1uLRq2iuLU-yTRUwT_r", 60),
(7, "Taro Bubble Milk Tea", "Bubble Milk Tea", "Black Pearl", 4, "Discover a new level of indulgence with our creamy and delicious taro bubble tea. Made with real taro root and blended to perfection, our bubble tea boasts a rich, velvety texture that is sure to please. Savor the subtle hints of vanilla and nuttiness with every sip, complemented by the satisfying chewiness of our tapioca pearls. Whether you're in need of a quick pick-me-up or simply craving a sweet treat, our taro bubble tea is the perfect choice.", "https://drive.google.com/uc?export=view&id=1RY9Y5mHr2npnrsT-I0mquCzrWCoY79k0", "https://drive.google.com/uc?export=view&id=1zhSWnfPiWld0Pz_hkv9YtFhNujciJ3O9", "https://drive.google.com/uc?export=view&id=1P4-j2U45msCKT6iTXvTtdp2G6LX7hH9o", 60);

INSERT INTO administrator
VALUES (1, "Kritchanapat", "Earthza007", "Kritchanapat", "Junju", "2003-05-26", "kritchanapat.jun@student.mahidol.edu"),
(2, "Thitiwut", "Bosszahahaha55566", "Thitiwut", "Harnphatcharapanukorn", "2003-04-08", "thitiwutharn@gmail.com"),
(3, "Sirasit", "himzaza", "Sirasit", "Puangpathanachai", "2003-01-18", "sirasit.pun@student.mahidol.edu"),
(4, "thanawat", "aritsulynn", "Thanawat", "Jarusuthirug", "2002-02-27", "thanawat.jau@student.mahidol.edu"),
(5, "bhubodin", "songzaba", "Bhubodin", "Somwhang", "2002-02-27", "bhubodin.som@student.mahidol.edu"),
(6, "ict", "ict555", "ict", "user", "2009-05-20", "ict@mahidol.ac.th"),
(7, "Anababa", "abc1234", "Anna", "Robertson", "1998-04-06", "anna.rob@hotmail.com"),
(8, "AnaWooo", "DDAisReal55", "Anna", "Dupont", "1995-06-08", "anna.dup@hotmail.com");