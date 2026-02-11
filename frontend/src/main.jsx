import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. Import the Provider and your Store
import { Provider } from 'react-redux';
import store from './redux/store'; // Adjust this path to where your store.js is

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Wrap App in Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)