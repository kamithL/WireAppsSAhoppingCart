import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas'; // Import your root saga

// Create the Redux Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Apply middleware to the store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
