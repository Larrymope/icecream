import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

export default class Cart extends Component {
    constructor(){
        super();
        this.state = {
            user: 'guest'
        }
        this.getUser = this.getUser.bind(this);
    }

    getUser(){
        axios.get('/user').then(res => {
            console.log(res.data[0].display_name)
            this.setState({
                user:res.data[0].display_name
            })
        } )
    }

    componentDidMount(){
        this.getUser()
    }

    render() {
        return(
            <div>
                <div>{this.state.user}</div>

            

            </div>
        )
    }
}
