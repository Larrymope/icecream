import React from 'react';
import './nav.css'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

export default class Nav extends React.Component {
    constructor(){
        super();
        this.state = {
            user:''
        }
        this.getUser = this.getUser.bind(this);
    }

    getUser(){
        axios.get('/user').then(res => {
            if(res.data[0]){
            this.setState({
                user:res.data[0].display_name
            })}
        } )
    }

    componentDidMount(){
        this.getUser();
    }

    render(){
        const loginOrNot = this.state.user ? (
        <div>
            <div>Hi, {this.state.user.split(' ')[0]}</div>
           <a href='http://localhost:3006/auth/logout'> <div className='log-font'>(Log out)</div> </a>
        </div>
        ) : (
        <div>
             <a href='http://localhost:3006/auth'> <div>Sign In</div></a>
        </div>
        )
        

    return(
        <div className='nav'  >
            <h3></h3>

            {/* <Link to='/products' >Flavors</Link> */}
            {/* <Link to='/signin' >Sign in</Link> */}
            {loginOrNot}
            <Link  to='/' >Home</Link>
            <Link  to='/cart' >Cart</Link>
            <input placeholder='search' />


        </div>
    )
}
}
