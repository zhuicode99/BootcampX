SELECT SUM(duration) as total_duration 
FROM assignment_submissions 
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id /* join students table first then we have cohort_id on new table */
WHERE cohorts.name = 'FEB12'; 