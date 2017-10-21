UPDATE customer
SET archive=$1
WHERE id = $2;