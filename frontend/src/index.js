import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store, { persistor } from './store/index'
import { PersistGate } from 'redux-persist/integration/react'

import './styles/index.css'
import './styles/minireset.min.css'
import './styles/pretendard.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>,
)
