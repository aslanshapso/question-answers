import React from 'react'
import { render } from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'
import thunk from 'redux-thunk';


let devToolsMiddleware = () => {
  return createStore;
};

if (window.devToolsExtension) {
  devToolsMiddleware = window.devToolsExtension();
}

const middleware = compose(
  applyMiddleware(thunk),
  devToolsMiddleware
);

// export default compose(applyMiddleware(thunk))(createStore)(duedates);

const store = createStore(rootReducer,middleware)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
