import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUsers } from '../actions/userActions'
import UserManagement from './UserManagement'

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchUsers
  }, dispatch)
}

const UserManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement)

export default UserManagementContainer
