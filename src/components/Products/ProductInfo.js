import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


//this.props.match.id
//axios.get('/product/${this.props.match.id}')



export default class ProductInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: {},
            quantity: 1,
        }
        this.loadState = this.loadState.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }
    loadState(){
        console.log(this.props)
       axios.get(`/getaproduct/${this.props.match.params.id}`).then(res => {
           console.log(res)
           this.setState({
               product: res.data[0]
           })
       })
    }

    addToCart(){
        let { id } = this.state.product
        let quantity = this.state.quantity;
        let body = { id, quantity }
        axios.post('/addtocart', body).then(() => alert('ADDED TO CART'))
    }
    
    updateQuantity(value){
        
        this.setState({
            quantity:value
        })
    }

    componentDidMount(){
       this.loadState()
    }
  
    render()
       { console.log(this.state.product)
           return(
            <div>
            <span>{this.state.product.flavor}</span>
            <br/>
            <br/>
            <span>{this.state.product.description}</span>
            <br/>
            <br/> 
           <img src={this.state.product.picture} alt='picture' width='400px'/>
            <br/>
            <br/>
            <span>{this.state.product.price}</span>
            <h4>{this.state.quantity}</h4>
            <input className='inputbox' onChange={(e) => this.updateQuantity(e.target.value)} />
            <button onClick={this.addToCart} >Add to Order</button>
            

            </div>
        )
    }
}