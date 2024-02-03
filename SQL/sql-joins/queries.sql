-- write your queries here

SELECT * FROM owners
FULL JOIN vehicles
ON owners.id = vehicles.owner_id;

SELECT first_name, last_name, COUNT(*)
FROM owners
RIGHT JOIN vehicles
ON owners.id = vehicles.owner_id
GROUP BY first_name, last_name, vehicles.owner_id ORDER BY first_name ASC;

SELECT first_name, last_name, round(AVG(price)), COUNT(owner_id)
FROM owners
JOIN vehicles
ON owners.id = vehicles.owner_id
GROUP BY first_name, last_name
HAVING AVG(price) > 10000 AND COUNT(vehicles.owner_id) > 1 ORDER BY first_name DESC;