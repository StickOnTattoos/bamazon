DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
	id INTEGER AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10) NOT NULL,
    stock_quantity INTEGER(5),
    PRIMARY KEY (id)
    );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("computer", "electronics", 1000, 100),
("cd player", "electronics", 50, 25),
("keyboard", "electronics", 99, 9),
("javascript for dummies", "books", 15, 5),
("the count of monte cristo", "books", 25, 125),
("dog food", "pets", 20, 99),
("dog toys", "pets", 5, 20),
("sunshade", "cars", 15, 55),
("car cover", "cars", 50, 73),
("corn", "food", 10, 225);