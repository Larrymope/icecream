select * from users
where (username, password) = ($1, $2);