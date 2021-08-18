
//react
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

//redux
import createStore from './redux/store';

//styled
import 'semantic-ui-css/semantic.min.css';
import './styled.scss';

//components
import App from './components/App';

ReactDOM.render(
  <Provider store={createStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
)