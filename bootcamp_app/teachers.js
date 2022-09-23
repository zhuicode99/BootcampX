const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

/* pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = '${process.argv[2] || 'JUL02'}' 
ORDER BY teachers.name;
`) //|| means if argv2 has no input, will return JUL02
.then(res => {
  res.rows.forEach(something => {
    console.log(`${something.cohort} : ${something.teacher}`); //something can be anything
  })
}).catch(err => console.error('query error', err.stack));
/*bootcamp answer:
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
}); */


//Parameterized Query to prevent malicious injection

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teachers.name;
`

const cohortName = process.argv[2] || 'JUL02'
const values = [cohortName]

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(something => {
    console.log(`${something.cohort} : ${something.teacher}`); //something can be anything
  })
}).catch(err => console.error('query error', err.stack));