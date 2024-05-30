import {configureStore} from '@reduxjs/toolkit'
import {userReducer} from './reducers/user';
import { cartReducer } from './reducers/Cart';

const store = configureStore({
    reducer:{
user:userReducer,
cart:cartReducer
    }
})
export default store;