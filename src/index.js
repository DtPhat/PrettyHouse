import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { store } from "./redux/store"
import { Provider } from 'react-redux';
import ReactGA from "react-ga4";

ReactGA.initialize("G-SDXP7Y6FXC");

ReactGA.send({ hitType: "pageview", page: "window.location.pathname",});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
      <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
      </BrowserRouter>
  // </React.StrictMode>
);
