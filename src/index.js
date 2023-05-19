import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from './app/store';
import { GoogleOAuthProvider } from '@react-oauth/google';


// React and ReactDOM are libraries that enable you to build user interfaces using React components and render them to the DOM.

// The line import './index.css'; imports a CSS file (index.css) that contains styles specific to this application.

// App is a component imported from the App.js file, which represents the main component of the application.

// The Provider component is imported from the 'react-redux' library and is used to provide the Redux store to the React components.

// The PersistGate component is imported from the 'redux-persist/integration/react' library and is used to persist and 
//rehydrate the Redux store.

// The store and persistor are imported from the './app/store' file. We'll explain the contents of this file separately.

// The ReactDOM.render() function is called to render the application. It takes two arguments:

// The JSX code within the parentheses, which represents the structure of the application.
// The document.getElementById('root') expression, which identifies the DOM element where the application will be rendered.

ReactDOM.render(
  <GoogleOAuthProvider clientId="954820964588-l8ba8pbqa49riqctv9fa6ckrt1dbul77.apps.googleusercontent.com">
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);