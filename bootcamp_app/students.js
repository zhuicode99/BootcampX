const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
/* 
//pool.query is the function accept sql query as string. use node to run
pool.query(` 
SELECT id, name, cohort_id
FROM students
LIMIT 5;
`)
.then(res => {
  console.log(res.rows);//console.log(res); will print the whole result, res.rows only print out the rows.//dealing with JavaScript objects.
})//The result is just an array of JavaScript objects.
.catch(err => console.error('query error', err.stack));

 */
//or from psql: \c bootcampx, SELECT id, name, cohort_id FROM students LIMIT 5;, same result




/* 
pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
LIMIT 5;
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
});
/* vagrant [BootcampX]> node bootcamp_app/students.js 
Armand Hilll has an id of 1 and was in the FEB12 cohort
Stephanie Wolff has an id of 2 and was in the FEB12 cohort
Stan Miller has an id of 3 and was in the FEB12 cohort
Elliot Dickinson has an id of 4 and was in the FEB12 cohort
Lloyd Boehm has an id of 5 and was in the FEB12 cohort */ 


/* pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${process.argv[2]}%'
LIMIT ${process.argv[3] || 5}; 
`)//if argv3 no input, will return 5 as the limit
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack)); 

*///before parameterize


//Parameterized Query to prevent malicious injection
const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`, limit];

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack)); 