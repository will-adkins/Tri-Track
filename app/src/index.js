import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import { setProfiles } from './action-creators/profiles'

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiPickersUtilsProvider>,
  document.getElementById('root')
)
// registerServiceWorker()

store.dispatch(setProfiles)
