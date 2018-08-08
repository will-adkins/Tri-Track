import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import { setProfiles } from './action-creators/profiles'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()

store.dispatch(setProfiles)

/*
const cacheProfile = window.localStorage.getItem('cacheProfile') || {}

if (isEmpty(cacheProfile)) {
  dispatch({type: CURRENT_PROFILE_LOGIN_SUCCEEDED}, payload: cacheProfile)
  history.push('/home')
} else {
  render Welcome ?
}
*/
