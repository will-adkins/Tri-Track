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
    type: 'light',
    primary: { main: '#000000' },
    secondary: { main: '#8FC1E3' },
    background: { default: '#F7F9FB' },
    swim: { main: '#3D52D5' },
    run: { main: '#4BAA4C' },
    bike: { main: '#F72727' }
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
