import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import './index.css'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import { setProfiles } from './action-creators/profiles'
import { CssBaseline } from '@material-ui/core'
import { deepPurple, amber } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#4400A3'
    },
    secondary: {
      main: '#0CCE6B'
    },
    background: {
      default: '#DAD2D8'
    }
  }
})

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </Provider>
  </MuiPickersUtilsProvider>,
  document.getElementById('root')
)
// registerServiceWorker()

store.dispatch(setProfiles)
