import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/userActions'

class LoginForm extends Component {

    state = {
        email: "",
        password: "",
        loginErrors: []
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value  })
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log("Submitting Form")
        // assemble packet
        // call #loginUser
        // reset form
        // handle login errors?
        // debugger;
        const loginPacket = {
            user: { 
                email: this.state.email,
                password: this.state.password
            }
        }

        this.props.loginUser(loginPacket)
        this.setState({
            email: "",
            password: ""
        })
    }

    render() {
        return (
            <div id="userNotLoggedIn">
                <div id="userFormHeader">Log In</div>
                <div id="alternateUserLink"><a href="./signup">Or Sign Up</a></div>
                <form id="loginForm" className="userForm" onSubmit = { e => this.handleSubmit(e) } >
                    <label className="formLabel">
                        EMAIL:
                        <input type="email" 
                            id="email" 
                            name="email" 
                            className="formInput" 
                            onChange={ e => this.handleChange(e) } 
                            value={this.state.email} 
                            required></input>
                    </label>

                    <label className="formLabel">
                        PASSWORD:
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className="formInput" 
                            onChange={ e => this.handleChange(e) }
                            value={this.state.password}
                            required ></input>
                    </label>

                    <input type="submit" className="customButton userFormButton" value="Log In"></input>
                </form>
            </div>
        )
    }

}


// const mapStateToProps = state => {
//     return ({

//     })
// }

const mapDispatchToProps = dispatch => {
    return ({
        loginUser: loginPacket => dispatch(loginUser(loginPacket))
    })
}

export default connect(null, mapDispatchToProps)(LoginForm)


// export default LoginForm