import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../actions/userActions'

class UserControls extends Component {

    handleLogout = e => {
        e.preventDefault()
        this.props.logout()
    }

    render() {
        return (
            // Link for profile or account settings or something.
            <>
                <span className="greeting">{"Hello, "}{this.props.firstName}</span>
                <form 
                    id="logoutForm"
                    onSubmit = { e => this.handleLogout(e) }>
                    <input type="submit" className="customButton userControlsButton" value="Log Out"></input>
                </form>
            </>
        )
    }

}

const mapStateToProps = state => {
    return ({
        firstName: state.user.name.split(" ")[0]
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        logout: () => dispatch(logoutUser())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(UserControls)