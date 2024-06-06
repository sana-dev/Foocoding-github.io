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
  try {
    const [rows] = await connection.execute('SELECT capital FROM country WHERE name = ?', [country]);
    return rows.length ? rows[0].capital : 'No capital found for this country';
  } finally {
    await connection.end();
  }
}

async function getLanguagesInRegion(region) {
  const connection = await getDatabaseConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT DISTINCT language FROM country JOIN countrylanguage ON country.code = countrylanguage.countrycode WHERE region = ?',
      [region]
    );
    return rows.length ? rows.map(row => row.language) : [];
  } finally {
    await connection.end();
  }
}

async function getNumberOfCitiesSpeakingLanguage(language) {
  const connection = await getDatabaseConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT COUNT(DISTINCT city.name) AS city_count FROM city JOIN countrylanguage ON city.countrycode = countrylanguage.countrycode WHERE language = ?',
      [language]
    );
    return rows.length ? rows[0].city_count : 0;
  } finally {
    await connection.end();
  }
}

async function getCountriesWithSameLanguageAndContinent(country) {
  const connection = await getDatabaseConnection();
  try {
    const [rows] = await connection.execute(
      `SELECT c2.name 
       FROM country c1 
       JOIN countrylanguage cl1 ON c1.code = cl1.countrycode 
       JOIN country c2 ON c1.continent = c2.continent AND c1.code != c2.code 
       JOIN countrylanguage cl2 ON c2.code = cl2.countrycode AND cl1.language = cl2.language 
       WHERE c1.name = ?`,
      [country]
    );
    return rows.length ? rows.map(row => row.name) : ['FALSE'];
  } finally {
    await connection.end();
  }
}

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  try {
    const country = await askQuestion('What is the capital of country X? ');
    const capital = await getCapitalOfCountry(country);
    console.log(`The capital of ${country} is ${capital}`);

    const region = await askQuestion('List all the languages spoken in the region Y: ');
    const languages = await getLanguagesInRegion(region);
    console.log(`Languages spoken in ${region}: ${languages.length ? languages.join(', ') : 'No languages found'}`);

    const official_language = await askQuestion('Find the number of cities in which language Z is spoken: ');
    const cityCount = await getNumberOfCitiesSpeakingLanguage(official_language);
    console.log(`Number of cities where ${official_language} is spoken: ${cityCount}`);

    const countryForComparison = await askQuestion('Enter a country to find similar countries: ');
    const similarCountries = await getCountriesWithSameLanguageAndContinent(countryForComparison);
    console.log(`Countries with the same official language and in the same continent as ${countryForComparison}: ${similarCountries.join(', ')}`);

    const hasSimilarCountries = similarCountries.includes('FALSE') ? false : true;
    console.log(`Are there countries with the same official language in the same continent as ${countryForComparison}? ${hasSimilarCountries ? 'Yes' : 'No'}`);
    
  } catch (err) {
    console.error(err);
  } finally {
    rl.close();
  }
}

main();
