import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reduceReducers from '../reducers';

const logger = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = createStore(reduceReducers, composeEnhancers(
  applyMiddleware(thunk, logger)
));

export default function configureStore() {
  return createStoreWithMiddleware;
}
