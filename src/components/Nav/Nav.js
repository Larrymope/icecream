import React from 'react';
import './nav.css'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

export default function Nav (props) {
    return(
        <div className='nav'  >


            <Link to='/products' >Flavors</Link>
            <Link to='/signin' >Sign in / Sign up!</Link>
            <Link  to='/' >Home</Link>
            <Link  to='/cart' >Cart</Link>
            <input placeholder='search' />


        </div>
    )
}