
// const fs = require('fs');
// const fileStream = fs.createReadStream('users-data.csv', 'utf8');
// const PORT =8000;

// let totalSalary = 0;
// let numEntries = 0;
// let minSalary = Infinity;
// let maxSalary = -Infinity;
// let minAge = Infinity;
// let maxAge = -Infinity;
// let minSalaryProfession = '';
// let maxSalaryProfession = '';


// let FirstLine = true;

// fileStream.on('data', function(chunk) {
//     const lines = chunk.split('\n');
//     lines.forEach(line => {
//         if (FirstLine) {
//             FirstLine = false;
//             return;
//         }

//         // Split the line into its components
//         const fields = line.trim().split(',');

     
//         const salary = parseFloat(fields[2]);
//         const age = parseInt(fields[3]);
//         const profession = fields[1];

//         totalSalary += salary;

//         // Update minimum salary and corresponding profession
//         if (salary < minSalary) {
//             minSalary = salary;
//             minSalaryProfession = profession;
//         }

//         // Update maximum salary and corresponding profession
//         if (salary > maxSalary) {
//             maxSalary = salary;
//             maxSalaryProfession = profession;
//         }

//         // Update minimum age
//         if (age < minAge) {
//             minAge = age;
//         }

//         // Update maximum age
//         if (age > maxAge) {
//             maxAge = age;
//         }

//         // Increment number of entries
//         numEntries++;
//     });
// });

// fileStream.on('end', function() {
//     // Calculate average salary
//     const averageSalary = totalSalary / numEntries;

 
//     const resultData = `Total Salary: ${totalSalary}\n
//     Average Salary: ${averageSalary}\n${minSalaryProfession} 
//     have the Minimum Salary: ${minSalary}\n${maxSalaryProfession} 
//     have the Maximum Salary: ${maxSalary}\n
//     Minimum age: ${minAge}\n
//     Maximum age: ${maxAge}`;

//     fs.writeFile('results.txt', resultData, (err) => {
//         if (err) throw err;
//         console.log("http://localhost:8000",'Results written to results.txt');
//     });
// });
