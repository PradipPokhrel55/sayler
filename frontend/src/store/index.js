import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducers'; // Make sure this is your combined reducers file
import {thunk} from 'redux-thunk'; // Example of a middleware

// Initialize middleware array
const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middleware) // Correctly applying middleware
  )
);

export default store;
