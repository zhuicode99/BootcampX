SELECT day, COUNT(assignments.*) as num_of_assignments, SUM(duration) as duration
FROM assignments
GROUP BY day
ORDER BY day;