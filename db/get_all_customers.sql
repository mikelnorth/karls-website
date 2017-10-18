SELECT * FROM customer AS c
JOIN wedding AS w ON c.id = w.customer_id
WHERE c.archive = 'f'
ORDER BY c.id desc