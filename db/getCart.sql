select orders.id, flavor, price, quantity, picture from orders join icecream
on orders.flavor_id = icecream.id
where orders.user_id = $1