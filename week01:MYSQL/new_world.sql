-- select * from  country;
select  name 
from  country 
where population > 8000000 and name like'%land%';
select  name 
from  country
where name like '%land%';
select name from city
where population between 500000 and 1000000;

SELECT city.name AS capital_name
FROM city
INNER JOIN country ON city.id = country.capital
WHERE country.continent = 'Europe';

SELECT country.name 
FROM country 
JOIN city  ON country.code = city.countrycode
GROUP BY country.code, country.name
HAVING COUNT(city.id) > 10 AND SUM(city.population) > 50000000;

select city.name
from city
join(
select country.code
from country
join city on country.code=city.countrycode
group by country.code
 HAVING COUNT(city.id) > 10 AND SUM(city.population) > 50000000
) sub ON city.countrycode = sub.code
WHERE city.population > 5000000;


SELECT country.continent, country.name AS country_name, country.capital 
FROM country 
WHERE country.population / country.surfacearea > 1000;

SELECT country.continent, country.name AS country_name, country.surfacearea 
FROM country 
JOIN (
    SELECT continent, MAX(surfacearea) AS max_area 
    FROM country 
    WHERE continent != 'Antarctica'
    GROUP BY continent
) sub ON country.continent = sub.continent AND country.surfacearea = sub.max_area;

select *  from country;