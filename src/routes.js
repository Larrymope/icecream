import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Posts from './components/Posts/Posts';

export default (
    <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/products' component={Products} />
        <Route path='/cart' component={Cart} />
        <Route path='/posts' component={Posts} />
        
    </Switch>
)