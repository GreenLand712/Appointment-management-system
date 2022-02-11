import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import Add from './Add'
import Login from './Login'
import Client from './Client'
import Edit from './Edit'
import Signup from './Signup'

export class App extends Component {
  render() {
    return (
      <div>
        <Routes>
            <Route exact path='/' element={<Login />} />
            <Route path='/client' element={<Client />} />
            <Route path='/add' element={<Add />} />
            {/* <Route path='/{id}'>
                <Edit />
            </Route>
            <Route path='/signup'>
                <Signup />
            </Route> */}
        </Routes>
      </div>
    )
  }
}

export default App
