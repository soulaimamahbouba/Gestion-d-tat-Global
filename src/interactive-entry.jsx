import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { interactiveStore } from './redux/interactiveStore';
import PersistentThemeProvider from './context/PersistentThemeProvider';
import InteractiveApp from './InteractiveApp';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={interactiveStore}>
      <PersistentThemeProvider>
        <InteractiveApp />
      </PersistentThemeProvider>
    </Provider>
  </React.StrictMode>
);
