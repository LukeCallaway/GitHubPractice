-- Comments in SQL Start with dash-dash --
-- Query number 1 --
INSERT INTO products (name, price, can_be_returned) VALUES ('chair', 44.00, false);
-- Query number 2 --
INSERT INTO products (name, price, can_be_returned) VALUES ('stool', 25.99, true);
-- Query number 3 --
INSERT INTO products (name, price, can_be_returned) VALUES ('table', 124.00, false);
-- Query number 4 --
SELECT * FROM products;
-- Query number 5 --
SELECT name FROM products;
-- Query number 6 --
SELECT name, price FROM products;
-- Query number 7 --
INSERT INTO products (name, price, can_be_returned) VALUES ('lamp', 24.99, false);
-- Query number 8 --
SELECT * FROM products WHERE can_be_returned = true;
-- Query number 9 --
SELECT * FROM products WHERE can_be_returned = true;
-- Query number 10 --
SELECT * FROM products WHERE price >= 22.50 and price <= 99.99;
-- Query number 11 --
UPDATE products SET price = price - 20.00;
-- Query number 12 --
DELETE FROM products WHERE price < 25;
-- Query number 13 --
UPDATE products SET price = price + 20.00;
-- Query number 14 --
UPDATE products SET can_be_returned = true;
