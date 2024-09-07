// reducers.js
import { combineReducers } from 'redux';

// Define your reducers here
const initialState = {
  counter: 0,
};

// Reducer function for counter
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

// Combine reducers if you have multiple reducers
const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;
