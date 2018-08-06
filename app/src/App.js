import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Welcome from './pages/welcome'
import Login from './pages/welcome/login'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
)

export default App
