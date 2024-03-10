const fs = require('fs');

let container = '';
let isFirstLine = true;
const inputFile = './users-data.csv';
const outputFile = 'results.txt';

const readableStream = fs.createReadStream(inputFile, 'utf8');

let totalSalary = 0;
let peopleAmount = 0; // o to exclude the header line 
let minAge = Number.MAX_SAFE_INTEGER;
let maxAge = Number.MIN_SAFE_INTEGER;
let professionData = {};

readableStream.on('data', (chunk) => {
    container += chunk;

    const lines = container.split(/\r?\n/);
    container = lines.pop();

    lines.forEach((line, index) => {
        if (index === 0 || line.trim() === '') {
            // Skip the first line (header) and empty lines
            return;
        }

        const fields = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
        const age = parseInt(fields[3]);
        const profession = fields[7].trim();
        const salary = parseInt(fields[8]);

        totalSalary += salary;

        peopleAmount++;

    
        minAge = Math.min(minAge, age);
        maxAge = Math.max(maxAge, age);

        
        if (!(profession in professionData)) {
            professionData[profession] = {
                minSalary: salary,
                maxSalary: salary
            };
        } else {
            professionData[profession].minSalary = Math.min(professionData[profession].minSalary, salary);
            professionData[profession].maxSalary = Math.max(professionData[profession].maxSalary, salary);
        }
    });
});

readableStream.on('end', () => {
    const result = {
        totalSalary: totalSalary,
        averageSalary: Math.round(totalSalary / peopleAmount), // Round to the nearest integer
        peopleAmount: peopleAmount,
        minAge: minAge,
        maxAge: maxAge,
        professionData: professionData
    };


    fs.writeFile(outputFile, JSON.stringify(result, null, 2), (err) => {
        if (err) {
            console.error('Error writing results to file:', err);
        } else {
            console.log('Results written to results.txt');
        }
    });
});
