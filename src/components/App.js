import React, { Component } from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import '../styles/App.css'

import SendPromptContainer from './SendPromptContainer'
import UserManagementContainer from './UserManagementContainer'
import CreatePairContainer from './CreatePairContainer'
import NewUserContainer from './NewUserContainer'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeKey: '1'
    }
    this._handleSelect = this._handleSelect.bind(this)
    this._renderActiveContainer = this._renderActiveContainer.bind(this)
  }

  _handleSelect (eventKey) {
    // event.preventDefault()
    this.setState({activeKey: eventKey})
  }

  _renderActiveContainer () {
    switch (this.state.activeKey) {
      case '1':
        return (<SendPromptContainer />)
      case '2':
        return (<UserManagementContainer />)
      case '3':
        return (<CreatePairContainer />)
      case '4':
        return (<NewUserContainer />)
      default:
        return null
    }
  }

  render () {
    return (
      <div className='App'>
        <h1>Pairachute</h1>
        <Nav bsStyle='tabs' activeKey={this.state.activeKey} onSelect={this._handleSelect}>
          <NavItem eventKey='1' href='/home'>Send New Prompt</NavItem>
          <NavItem eventKey='2' title='Item'>Manage Users</NavItem>
          <NavItem eventKey='3' title='Item'>Create New Pair</NavItem>
          <NavItem eventKey='4' title='Item'>Create New User</NavItem>

        </Nav>
        {this._renderActiveContainer()}
      </div>
    )
  }
}

export default App
