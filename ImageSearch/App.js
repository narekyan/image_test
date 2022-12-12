import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import Search from './Search';

//const rootReducer = combineReducers({
//  reducer: reducer
//});

const store = createStore(reducer, applyMiddleware(thunk));

const App = () => (
  <Provider store={store}>
    <Search />
  </Provider>
);

export default App;