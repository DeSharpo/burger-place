import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/app/app';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

createRoot(container).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
