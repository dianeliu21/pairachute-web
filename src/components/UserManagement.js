import React, { Component } from 'react'
import '../styles/styles.css'
import DisplayUsers from './DisplayUsers'

class UserManagement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: {
        pairedUsers: {},
        unpairedUsers: {},
        totalCount: 0,
        pairedCount: 0,
        unpairedCount: 0
      }
    }

    this._sortUsers = this._sortUsers.bind(this)
  }

  async componentDidMount () {
    await this.props.fetchUsers()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.userInfo.users) {
        this._sortUsers(nextProps)
      }
    }
  }

  _sortUsers (nextProps) {
    var userObj = {
      pairedUsers: {},
      unpairedUsers: {},
      totalCount: 0,
      pairedCount: 0,
      unpairedCount: 0
    }

    for (var user_id in nextProps.userInfo.users) {
      if (nextProps.userInfo.users[user_id].pair_id) {
        userObj.pairedUsers[user_id] = nextProps.userInfo.users[user_id]
      } else {
        userObj.unpairedUsers[user_id] = nextProps.userInfo.users[user_id]
      }
    }

    userObj.pairedCount = Object.keys(userObj.pairedUsers).length
    userObj.unpairedCount = Object.keys(userObj.unpairedUsers).length
    userObj.totalCount = userObj.pairedCount + userObj.unpairedCount

    this.setState({users: userObj})
  }

  render () {
    return (
      <div>
        <h2>Users</h2>
        <DisplayUsers users={this.state.users}/>
      </div>
    )
  }
}

export default UserManagement
