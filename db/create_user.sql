insert into users
(display_name, auth_id, img)
values
($1, $2, $3)
RETURNING *;