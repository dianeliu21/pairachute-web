import React, { Component } from 'react'
import '../styles/styles.css'
import DisplayPairs from './DisplayPairs'

class UserManagement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: {
        soloReflectionUsers: {},
        pairedReflectionUsers: {},
        totalCount: 0,
        soloReflectionCount: 0,
        pairedReflectionCount: 0,
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
        this._sortUsers(nextProps.userInfo.users)
      }
    }
  }

  _sortUsers (users) {
    var userObj = {
      soloReflectionUsers: {},
      pairedReflectionUsers: {},
      totalCount: 0,
      soloReflectionCount: 0,
      pairedReflectionCount: 0,
    }

    for (var user_id in users) {
      console.log('this is user', user_id, users)
      if (users[user_id].reflectionType === 'paired') {
        userObj.pairedReflectionUsers[user_id] = users[user_id]
      } else {
        userObj.soloReflectionUsers[user_id] = users[user_id]
      }
    }

    userObj.pairedReflectionCount = Object.keys(userObj.pairedReflectionUsers).length
    userObj.soloReflectionCount = Object.keys(userObj.soloReflectionUsers).length
    userObj.totalCount = userObj.pairedReflectionCount + userObj.soloReflectionCount

    this.setState({users: userObj})
  }

  render () {
    return (
      <div>
        <DisplayPairs users={this.state.users}/>
      </div>
    )
  }
}

export default UserManagement
