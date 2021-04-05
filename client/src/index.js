import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './context/AuthContext';
import StakeProvider from './context/StakeContext';

ReactDOM.render(<AuthProvider><App /></AuthProvider>, document.getElementById('root'));

