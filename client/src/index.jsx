import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

axios.defaults.baseURL = process.env.BASE_URL;

root.render(
    <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </React.StrictMode>
);
