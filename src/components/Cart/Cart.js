import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import './cart.css';

export default class Cart extends Component {
    constructor(){
        super();
        this.state = {
            user: 'guest',
            cart: [],
            total: 0
        }
        this.getUser = this.getUser.bind(this);
        this.getUserCart = this.getUserCart.bind(this);
        this.totalItems = this.totalItems.bind(this);
        this.totalCost = this.totalCost.bind(this);


    }

    getUser(){
        axios.get('/user').then(res => {
            if(res.data[0])
            this.setState({
                user:res.data[0].display_name
            })
        } )
    }

    getUserCart(){
        axios.get('/cart').then(res => {
            // console.log(res.data)
            let newArr = res.data;
            for (let i = 0; i < newArr.length; i++){
                for(let j = newArr.length-1; j > i; j--){
                  // console.log(arr[i])
                  if( newArr[i].flavor == newArr[j].flavor){
                    // console.log(arr[i],arr[j])
                    newArr[i].quantity += newArr[j].quantity
                    newArr.splice(j,1)
                  }
                }
              }
              this.setState({
                  cart:newArr
              })
        })
    }
    
    totalItems(){
       return this.state.cart.reduce((items, element) => {
            return items + element.quantity
          }, 0)
          
    }

    totalCost(){
        return this.state.cart[0]&&this.state.cart.reduce((total, element ) => {
            return total + (element.price * element.quantity)
        },0).toFixed(2)
    }

    componentDidMount(){
        this.getUser()
        this.getUserCart()

    }

    render() { /////RENDER
     let mappedCart = this.state.cart.map((element, index) => {
         return <div key={index} >
          <h3 > {element.flavor} </h3>

          <img  src={element.picture} alt='pic' className='pic'/>
          <h3> {element.price} </h3>
          <h3> -quantity- {element.quantity} <button  >Change</button> </h3>
          </div>
     })
     
            
//// RETURN
        return(
            <div>
                {/* <div>{this.state.user}</div> */}
                <div>{mappedCart}</div>
                <div>Total ( {this.totalItems()} ) {this.totalCost()}</div>

                    {/* <div>{this.state.cart[0]&&this.state.cart[0].flavor}</div> */}

            </div>
        )
    }
}
