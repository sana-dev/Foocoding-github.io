// import mysql from 'mysql2/promise';
// import readline from 'readline';

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// async function getDatabaseConnection(){
//   return await mysql.createConnection({
//     host: "localhost",
//     user:"root",
//     database: 'new_world',
//     password: 'Mehak099!'

//   });
// }

// async function countryCapital(country){
//   const connection = await getDatabaseConnection();
//   const [rows]= await connection.execute('Select capital from country where name = ?',[country]);
//   await connection.end();
//   return rows.length ? row[0].capital : 'No capital found from this country';
// }

// async function RegionalLanguage(region){
//   const connection =await getDatabaseConnection();
//   const [rows] = await connection.execute(
//     'Select DISTINCT language from country Join countrylanguage on country.code = countrylanguage.countrycode where region = ?',
//     [region]
//   );
//   await connection.end();
//   return row.map(row => row.language);
// }

// async function getNumberOfCitiesSpeakingLanguage(language){
//   const connection = await getDatabaseConnection();
//   const [rows] = await connection.execute(
//     'select count(distinct city.name) as city_count from city join countryLanguage on city.countrycode = countrylanguage.countrycode where language = ?',
//     [language]
//   );
//   await connection.end();
//   return row[0].city_count;
// }

// async function sameLanguage(country){
//   const connection = await getDatabaseConnection();
//   const [rows] = await connection.execute(
//     'select c2.name from country c1 join country c2 on c1.continent = c2.continent and c1.code != c2.code join countrylanguage cl on c1.code = cl.countrycode where c1.name = ? and c2.code in (select countrycode from countrylanguage where language = cl.language)',
//      [country]
//   );
//   await connection.end();
//   return rows.length ? rows.map (row => row.name): ['FALSE'];
// } 

// function askQuestion (query){
//   return new promise (resolve => rl.question(query , resolve));
// }

// async function main(){
//   const country = await askQuestion('what is the capital of country X?');
//   const capital = await countryCapital (country);
//   console.log('the capital of ${country} is ${capital}');

//   const region = await askQuestion('List all the languages spoken in the region Y: ');
//   const languages = await RegionalLanguage (region);
//   console.log(`Languages spoken in ${region}: ${languages.join(', ')}`);


//   const language = await askQuestion('Find the number of cities in which language Z is spoken: ');
//   const cityCount = await sameLanguage(language);
//   console.log(`Number of cities where ${language} is spoken: ${cityCount}`);

//   const countryForComparison = await askQuestion ('Enter a country to find similar countries:');
//   const similarCountries = await sameLanguage (countryForComparison);
//   console.log(`countries with the same offical language and in the same continent as ${countryForComparison}: ${similarCountries.join(', ')}`) ;
  
//   rl.close();
  
// }

// main().catch(err=>{
//   console.log(err);
//   rl.close();
// })
import mysql from 'mysql2/promise';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function getDatabaseConnection() {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'new_world',
    password: 'Mehak099!'
  });
}

async function getCapitalOfCountry(country) {
  const connection = await getDatabaseConnection();
  const [rows] = await connection.execute('SELECT capital FROM country WHERE name = ?', [country]);
  await connection.end();
  return rows.length ? rows[0].capital : 'No capital found for this country';
}

async function getLanguagesInRegion(region) {
  const connection = await getDatabaseConnection();
  const [rows] = await connection.execute(
    'SELECT DISTINCT language FROM country JOIN countrylanguage ON country.code = countrylanguage.countrycode WHERE region = ?',
    [region]
  );
  await connection.end();
  return rows.map(row => row.language);
}

async function getNumberOfCitiesSpeakingLanguage(language) {
  const connection = await getDatabaseConnection();
  const [rows] = await connection.execute(
    'SELECT COUNT(DISTINCT city.name) as city_count FROM city JOIN countrylanguage ON city.countrycode = countrylanguage.countrycode WHERE language = ?',
    [language]
  );
  await connection.end();
  return rows[0].city_count;
}

async function getCountriesWithSameLanguageAndContinent(country) {
  const connection = await getDatabaseConnection();
  const [rows] = await connection.execute(
    `SELECT c2.name FROM country c1 
    JOIN country c2 ON c1.continent = c2.continent AND c1.code != c2.code 
    JOIN countrylanguage cl ON c1.code = cl.countrycode 
    WHERE c1.name = ? AND c2.code IN (SELECT countrycode FROM countrylanguage WHERE language = cl.language)`,
    [country]
  );
  await connection.end();
  return rows.length ? rows.map(row => row.name) : ['FALSE'];
}

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  const country = await askQuestion('What is the capital of country X? ');
  const capital = await getCapitalOfCountry(country);
  console.log(`The capital of ${country} is ${capital}`);

  const region = await askQuestion('List all the languages spoken in the region Y: ');
  const languages = await getLanguagesInRegion(region);
  console.log(`Languages spoken in ${region}: ${languages.join(', ')}`);

  const language = await askQuestion('Find the number of cities in which language Z is spoken: ');
  const cityCount = await getNumberOfCitiesSpeakingLanguage(language);
  console.log(`Number of cities where ${language} is spoken: ${cityCount}`);

  const countryForComparison = await askQuestion('Enter a country to find similar countries: ');
  const similarCountries = await getCountriesWithSameLanguageAndContinent(countryForComparison);
  console.log(`Countries with the same official language and in the same continent as ${countryForComparison}: ${similarCountries.join(', ')}`);

  rl.close();
}

main().catch(err => {
  console.error(err);
  rl.close();
});
