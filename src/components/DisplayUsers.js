import React, { Component } from 'react'
import '../styles/styles.css'
import UserRow from './UserRow'

class DisplayUsers extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }

    this._renderUsers = this._renderUsers.bind(this)
  }

  _renderUsers (status) {
    var users = []
    if (status === 'paired') {
      users = Object.entries(this.props.users.pairedUsers)
    } else if (status === 'unpaired') {
      users = Object.entries(this.props.users.unpairedUsers)
    }
    return users.map(item =>
      (<UserRow first_name={item[1].first_name} last_name={item[1].last_name}/>)
    )
  }

  render () {
    return (
      <div>
        <h2>Current Users ({this.props.users.totalCount})</h2>
        <div>
          <h3>Paired Users ({this.props.users.pairedCount})</h3>
          {this._renderUsers('paired')}
        </div>
        <div>
          <h3>Unpaired Users ({this.props.users.unpairedCount})</h3>
          {this._renderUsers('unpaired')}
        </div>
      </div>
    )
  }
}

export default DisplayUsers
