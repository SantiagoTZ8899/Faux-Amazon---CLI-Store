drop database if exists bamazon;

create database bamazon;

use bamazon;

--    * item_id (unique id for each product)
--    * product_name (Name of product)
--    * department_name 
--    * price (cost to customer)
--    * stock_quantity (how much of the product is available in stores)

create table products (
    id int not null primary key auto_increment,
    product_name varchar (100) not null,
    department_name varchar (100) not null,
    price int not null,
    stock_quantity int not null
);

INSERT INTO products (id, product_name, department_name, price, stock_quantity) VALUES (1, "NintendoSwitch", "VideoGames", 300, 500);
INSERT INTO products (id, product_name, department_name, price, stock_quantity) VALUES (2, "NintendoSwitchLite", "VideoGames", 200, 600);
INSERT INTO products (id, product_name, department_name, price, stock_quantity) VALUES (3, "Playstation4Pro", "VideoGames", 400, 450);
INSERT INTO products (id, product_name, department_name, price, stock_quantity) VALUES (4, "Playstation4", "VideoGames", 300, 550);
INSERT INTO products (id, product_name, department_name, price, stock_quantity) VALUES (5, "XboxOneX", "VideoGames", 400, 350);
INSERT INTO products (id, product_name, department_name, price, stock_quantity) VALUES (6, "RecordPlayer", "Music", 150, 95);
INSERT INTO products (id, product_name, department_name, price, stock_quantity) VALUES (7, "iPodClassic", "Music", 100, 5);
INSERT INTO products (id, product_name, department_name, price, stock_quantity) VALUES (8, "iPodClassic", "Music", 100, 5);
INSERT INTO products (id, product_name, department_name, price, stock_quantity) VALUES (9, "Hoodie", "Clothing", 60, 102);
INSERT INTO products (id, product_name, department_name, price, stock_quantity) VALUES (10, "Pants", "Clothing", 50, 277);
INSERT INTO products (id, product_name, department_name, price, stock_quantity) VALUES (11, "PairOfSocks", "Clothing", 22, 1832);

SELECT * FROM bamazon.products;
