import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Welcome from './pages/welcome'
import Login from './pages/welcome/login'
import SignUp from './pages/welcome/signUp'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign-up" component={SignUp} />
    </Switch>
  </BrowserRouter>
)

export default App
