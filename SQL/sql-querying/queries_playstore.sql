-- Comments in SQL Start with dash-dash --
-- Query number 1 --
SELECT * FROM analytics WHERE ID = 1880;
-- Query number 2 --
SELECT * FROM analytics WHERE last_updated = '2018-08-01';
-- Query number 3 --
SELECT category, COUNT(*) FROM analytics GROUP BY category;
-- Query number 4 --
SELECT * FROM analytics ORDER BY reviews DESC LIMIT 5;
-- Query number 5 --
SELECT * FROM analytics WHERE rating >= 4.8 ORDER BY reviews DESC LIMIT 1;
-- Query number 6 --
SELECT category, AVG(rating) AS avg_ratings FROM analytics GROUP BY category ORDER BY avg_ratings DESC;
-- Query number 7 --
SELECT app_name, price, rating FROM analytics WHERE rating <= 3 ORDER BY price DESC LIMIT 1;
-- Query number 8 --
SELECT * FROM analytics WHERE min_installs <= 50 and rating is not null;
-- Query number 9 --
SELECT * FROM analytics WHERE rating < 3 and reviews > 10000;
-- Query number 10 --
SELECT * FROM  analytics WHERE price >.10 and price < 1 and rating IS NOT NULL ORDER BY rating DESC LIMIT 5;
-- Query number 11 --
SELECT * FROM analytics ORDER BY last_updated LIMIT 1;
-- Query number 12 --
SELECT * FROM analytics ORDER BY price DESC LIMIT 1;
-- Query number 13 --
SELECT sum(reviews) FROM analytics;
-- Query number 14 --
SELECT category FROM analytics GROUP BY category HAVING COUNT(*) > 300;
-- Query number 15 --
SELECT app_name, reviews, min_installs,  min_installs / reviews AS proportion FROM analytics WHERE min_installs >= 100000 ORDER BY proportion DESC LIMIT 1;