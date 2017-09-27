import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import '../styles/styles.css'
import UserRow from './UserRow'

class DisplayPairs extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }

    this._renderUsers = this._renderUsers.bind(this)
  }

  _renderUsers (reflectionType, status) {
    var users = reflectionType === 'paired'
      ? Object.entries(this.props.users.pairedReflectionUsers)
      : Object.entries(this.props.users.soloReflectionUsers)

    var isPaired = status === 'paired'
    return users.map(item =>
     item[1].isPaired === isPaired
      ? (<UserRow key={item[0]} first_name={item[1].first_name} last_name={item[1].last_name}/>)
      : null
    )
  }

  render () {
    return (
      <div>
        <h3>All Users ({this.props.users.totalCount})</h3>
        <h3>Paired Reflection Type ({this.props.users.pairedReflectionCount})</h3>
        <div className="flex-row">
          <div className="user-column">
            <h4>Paired Users</h4>
            <ListGroup>
              {this._renderUsers('paired', 'paired')}
            </ListGroup>
          </div>
          <div className="user-column">
            <h4>Unpaired Users</h4>
            <ListGroup>
              {this._renderUsers('paired', 'unpaired')}
            </ListGroup>
          </div>
        </div>

        <h3>Solo Reflection Type ({this.props.users.soloReflectionCount})</h3>
        <div className="flex-row">
          <div className="user-column">
            <h4>Paired Users</h4>
            <ListGroup>
              {this._renderUsers('solo', 'paired')}
            </ListGroup>
          </div>
          <div className="user-column">
            <h4>Unpaired Users</h4>
            <ListGroup>
              {this._renderUsers('solo', 'unpaired')}
            </ListGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default DisplayPairs
