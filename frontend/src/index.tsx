import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Import axios to make some default configuration
import axios from 'axios';

//baseurl
axios.defaults.baseURL = 'http://localhost:8080/api/';

//@ts-ignore
const token = 'Bearer ' + JSON.parse(localStorage.getItem('token'));
if (token) {
	axios.defaults.headers.common['Authorization'] = token;
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
