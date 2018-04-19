import React from 'react';
import './nav.css'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserInfo} from '../../ducks/reducer';

export function Nav (props) {
    return(
        <div className='nav'  >
            <h3></h3>

            {/* <Link to='/products' >Flavors</Link> */}
            {/* <Link to='/signin' >Sign in</Link> */}
            <a href='http://localhost:3006/auth'> <div>Sign In</div></a>
            <Link  to='/' >Home</Link>
            <Link  to='/cart' >Cart</Link>
            <input placeholder='search' />


        </div>
    )
}

function mapStateToProps(state) {
    return {
        user:state.user
    }
}

export default connect(mapStateToProps, { getUserInfo })(Nav);