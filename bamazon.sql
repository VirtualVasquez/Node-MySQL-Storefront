DROP DATABASE IF EXISTS bamzaon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10, 2) NULL,
  stock_quantity INT(255),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pencils", "School Supplies", 1, 100), ("Erasers", "School Supplies", 0.50, 100),
("Binders", "School Supplies", 1.50, 50), ("Xbox One S 1TB", "Electronics", 299.99, 50),
("Playstation 4 Pro 1TB", "Electronics", 399.99, 25), ("USB Mouse", "Electronics", 10.00, 77),
("8 Piece Cooking Set", "Kitchenware", 109.99, 15), ("2L Food Processor", "Kitchenware", 149.99, 19),
("2-Slice Toaster", "Kitchenware", 34.99, 44), ("6-Slice Toaster-Oven", "Kitchenware", 49.99, 25);