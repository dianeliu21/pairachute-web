import React, { Component } from 'react'
import '../styles/styles.css'

class UserRow extends Component {

  render () {
    return (
      <div>
        <p>{this.props.first_name} {this.props.last_name}</p>
      </div>
    )
  }
}

export default UserRow
