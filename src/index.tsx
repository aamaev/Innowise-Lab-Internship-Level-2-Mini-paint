import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import AuthContextProvider from './contexts/AuthContext/AuthContext';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <BrowserRouter>
        <Provider store={store}>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </Provider>
    </BrowserRouter>
  );

