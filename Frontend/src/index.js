import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; 
// Yahan 'App' ka 'A' capital hona chahiye agar aapne file rename kar di hai
import App from './App'; 

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
