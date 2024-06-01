SELECT city.name AS capital_name
FROM city
INNER JOIN country ON city.countrycode = country.code
WHERE country.continent = 'Europe' AND city.name = country.name;
sELECT country.continent, country.name AS country_name
FROM country 
where continent like '%Europe%';
