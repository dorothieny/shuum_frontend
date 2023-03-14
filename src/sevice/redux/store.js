import thunk from 'redux-thunk';
import {mainReducer} from '../redux/reducers/mainReducer';
import { applyMiddleware, createStore, combineReducers, compose} from 'redux';


const rootReducer = combineReducers({
    main: mainReducer
   });

const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}

const composedEnhancer = compose(applyMiddleware(thunk), ...enhancerList);

const initStore = () => createStore(rootReducer, {}, composedEnhancer);

module.exports = {
  initStore
};

// export default configureStore(rootReducer, middleware);