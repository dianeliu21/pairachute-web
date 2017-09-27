import React, { Component } from 'react'
import { ListGroupItem } from 'react-bootstrap'
import '../styles/styles.css'

class UserRow extends Component {

  render () {
    return (
      <div>
        <ListGroupItem>
          {this.props.first_name} {this.props.last_name}
          {this.props.pair_name && `Pair: ${this.props.pair_name}`}
        </ListGroupItem>
      </div>
    )
  }
}

export default UserRow
