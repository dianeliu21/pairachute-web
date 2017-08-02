import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
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
        <h3>Current Users ({this.props.users.totalCount})</h3>
        <div className="flex-row">
          <div className="user-column">
            <h3>Paired Users ({this.props.users.pairedCount})</h3>
            <ListGroup>
              {this._renderUsers('paired')}
            </ListGroup>
          </div>
          <div className="user-column">
            <h3>Unpaired Users ({this.props.users.unpairedCount})</h3>
            <ListGroup>
              {this._renderUsers('unpaired')}
            </ListGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default DisplayUsers
