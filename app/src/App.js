import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Welcome from './pages/welcome'
import Login from './pages/welcome/login'
import SignUp from './pages/welcome/signUp'
import Home from './pages/home'
import Workouts from './pages/workouts'
import ViewWorkout from './pages/workouts/view'
import EditWorkout from './pages/workouts/edit'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/workouts" component={Workouts} />
      <Route exact path="/workouts/:id" component={ViewWorkout} />
      <Route exact path="/workouts/:id/edit" component={EditWorkout} />
    </Switch>
  </BrowserRouter>
)

export default App
