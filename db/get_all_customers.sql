select * from customer
FULL OUTER JOIN wedding on customer.id = wedding.customer_id
ORDER BY customer.id desc
returning *