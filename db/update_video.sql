UPDATE video
SET title=$1, embedded_link = $2,category=$3
WHERE id = $4;