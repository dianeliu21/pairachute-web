import React, { Component } from 'react'
import '../styles/App.css'

import SendPromptContainer from './SendPromptContainer'
import UserManagementContainer from './UserManagementContainer'

class App extends Component {
  render () {
    return (
      <div className="App">
        <h1>Pairachute</h1>
        <SendPromptContainer />
        <UserManagementContainer />
      </div>
    )
  }
}

export default App
