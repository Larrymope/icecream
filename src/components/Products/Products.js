import React, {Component} from 'react';
import axios from 'axios';
import ProductInfo from './ProductInfo';
import {Link} from 'react-router-dom';
import './product.css';


export default function Products(props) {
  // add a onClick event listener to get specified product info to push to productinfo
    
        return(
            <div>
            {/* <span>{props.element.flavor}</span>
            <br/>
            <br/>
            <span>{props.element.description}</span>
            <br/>
            <br/> */}
          <Link to={`/product/${props.element.id}`}> <img src={props.element.picture} alt='picture' className='circle' /></Link>
           {/* <br/>
            <br/>
            <span>${props.element.price}</span>
             */}

            </div>
        )
    }