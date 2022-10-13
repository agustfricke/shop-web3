import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './store';
import { TransactionsProvider } from "./context/TransactionContext";
import './bootstrap.min.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Provider store={store}>
  <TransactionsProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </TransactionsProvider>
  </Provider>
  ,


);


