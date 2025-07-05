import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/app/app.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './services/store';

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
