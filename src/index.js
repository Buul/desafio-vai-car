import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import App from './components/App';
import theme from './styles/theme';
import reducers from './reducers';
import './styles/app.scss';
import 'antd/dist/antd.css';
// eslint-disable-next-line no-underscore-dangle
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = applyMiddleware(thunk)(createStore)(reducers, devTools);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('app')
);
