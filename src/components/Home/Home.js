import React, {Component} from 'react';
import axios from 'axios';
import Products from '../../components/Products/Products';
import './Home.css';


export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            flavors: []
        }
        this.loadInventoryList = this.loadInventoryList.bind(this);

    }
    // methods
    loadInventoryList(){
        axios.get('/geticecream').then(res => {
            this.setState({
                flavors: res.data
            })
        })
    }

    mapIceCream(){
        return this.state.flavors.map((element, index) => {
            return <Products key={index} element={element} />
        })
    }

    componentDidMount(){
        this.loadInventoryList()
    }
  
    render() 
       {  console.log(this.state.flavors)
        
        
        return(
            <div className='home-color'>

            
            {this.mapIceCream()}

            </div>
        )
    }
}