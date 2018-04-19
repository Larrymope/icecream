import axios from 'axios';

const initialState = {
    user: 'guest',
    profilepic: '?',
    cart: []

}

const GET_USER_INFO = 'GET_USER_INFO';


export function getUserInfo() { //
    const userData = axios.get('/auth/me').then( res => {
        return res.data;
    })
    return {
        type: GET_USER_INFO,
        payload: userData
    }

}

export default function reducer(state=initialState, action) { // reducer is the state / state changer
    switch(action.type) {

        case GET_USER_INFO + '_FULLFILLED':
            return Object.assign( {}, state, {user: action.payload} )



        default: return state;

    }
}