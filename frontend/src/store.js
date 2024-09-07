import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Import your combined reducers

const store = configureStore({
  reducer: rootReducer,
  // Add middleware, enhancers, or other configurations here if needed
});

export default store;