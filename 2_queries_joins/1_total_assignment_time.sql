SELECT sum(assignment_submissions.duration) as total_duration /* use sum(duration) directly is fine */
FROM assignment_submissions
JOIN students ON students.id = student_id
WHERE students.name = 'Ibrahim Schimmel';