const mysql = require('mysql2/promise');
const prompt = require('prompt-sync')();

async function createConnection() {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Mehak099!',
        database: 'new_world'
    });
}

async function main() {
    const connection = await createConnection();

    async function executePreparedStatement(query, params) {
        const prepareStmt = 'PREPARE stmt FROM ?';
        const executeStmt = 'EXECUTE stmt USING ' + params.map((_, i) => `@param${i}`).join(', ');
        const deallocateStmt = 'DEALLOCATE PREPARE stmt';

        await connection.query(prepareStmt, [query]);

        for (let i = 0; i < params.length; i++) {
            await connection.query(`SET @param${i} = ?`, [params[i]]);
        }
        const [rows] = await connection.query(executeStmt);
        await connection.query(deallocateStmt);

        return rows;
    }

    const country = prompt('Enter the name of the country: ');
    const capitalQuery = 'SELECT capital FROM country WHERE name = ?';
    const capitalRows = await executePreparedStatement(capitalQuery, [country]);
    if (capitalRows.length > 0) {
        console.log(`The capital of ${country} is ${capitalRows[0].capital}`);
    } else {
        console.log(`Country ${country} not found.`);
    }

    const region = prompt('Enter the name of the region: ');
    const languagesQuery = 'SELECT DISTINCT language FROM country JOIN countrylanguage ON country.code = countrylanguage.countrycode WHERE region = ?';
    const languagesRows = await executePreparedStatement(languagesQuery, [region]);
    if (languagesRows.length > 0) {
        console.log(`Languages spoken in ${region}:`);
        languagesRows.forEach(row => console.log(row.language));
    } else {
        console.log(`Region ${region} not found or no languages found.`);
    }


    const language = prompt('Enter the name of the language: ');
    const citiesQuery = 'SELECT COUNT(DISTINCT city.name) AS cityCount FROM city JOIN countrylanguage ON city.countrycode = countrylanguage.countrycode WHERE language = ?';
    const citiesRows = await executePreparedStatement(citiesQuery, [language]);
    if (citiesRows.length > 0) {
        console.log(`Number of cities where ${language} is spoken: ${citiesRows[0].cityCount}`);
    } else {
        console.log(`Language ${language} not found or no cities found.`);
    }

    const countryForComparison = prompt('Enter the name of the country for comparison: ');
    const comparisonQuery = `
        SELECT DISTINCT otherCountry.name 
        FROM country AS givenCountry
        JOIN countrylanguage AS givenLang ON givenCountry.code = givenLang.countrycode
        JOIN countrylanguage AS otherLang ON givenLang.language = otherLang.language
        JOIN country AS otherCountry ON otherLang.countrycode = otherCountry.code
        WHERE givenCountry.name = ? 
        AND givenLang.isOfficial = 'T'
        AND otherLang.isOfficial = 'T'
        AND otherCountry.continent = givenCountry.continent
        AND otherCountry.name != givenCountry.name
    `;
    const comparisonRows = await executePreparedStatement(comparisonQuery, [countryForComparison]);

    if (comparisonRows.length > 0) {
        console.log(`Countries with the same official language and continent as ${countryForComparison}:`);
        comparisonRows.forEach(row => console.log(row.name));
    } else {
        console.log('FALSE');
    }

    await connection.end();
}

main().catch(err => {
    console.error(err);
});
