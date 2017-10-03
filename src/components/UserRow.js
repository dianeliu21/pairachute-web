import React, { Component } from 'react'
import { ListGroupItem } from 'react-bootstrap'
import '../styles/styles.css'

class UserRow extends Component {

  render () {
    return (
      <div>
        <ListGroupItem>
          {this.props.firstName} {this.props.lastName}
          {this.props.pair_name && `Pair: ${this.props.pair_name}`}
        </ListGroupItem>
      </div>
    )
  }
}

export default UserRow
