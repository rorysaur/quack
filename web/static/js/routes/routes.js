import React from 'react'
import Router, {Route, IndexRoute} from 'react-router'
import About from '../components/about.jsx'
import Quack from '../components/quack.jsx'
import Chat from '../components/chat.jsx'
import Login from '../components/login.jsx'

const routes = (
  <Route path='/' component={Quack}>
    <IndexRoute component={Login} />
    <Route path="/login" component={Login} />
    <Route path="/chat" component={Chat} />
    <Route path="/about" component={About}/>
  </Route>
)

export default routes
