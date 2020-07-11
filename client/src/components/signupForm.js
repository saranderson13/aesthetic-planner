import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createUser } from '../actions/userActions'

class SignupForm extends Component {

    state = {
        email: "",
        password: "",
        passwordConfirmation: "",
        username: "",
        name: "",
        registrationErrors: []
    }

    handleChange = e => {
        this.setState({ [e.target.id]: [e.target.value]  })
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log("Submitting Form")
    }



    render() {
        return(
            <>
            <div id="userFormHeader">Sign Up</div>
            <div id="alternateUserLink"><a href="./login">Or Log In</a></div>
            <form id="signupForm" className="userForm" onSubmit = { e => this.handleSubmit(e) } >
                <label className="formLabel">
                    EMAIL:
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="formInput" 
                        onChange={ e => this.handleChange(e) }
                        value={this.state.email} 
                        required ></input>
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

                <label className="formLabel">
                    CONFIRM PASSWORD:
                    <input 
                        type="password" 
                        id="passwordConfirmation" 
                        name="passwordConfirmation" 
                        className="formInput" 
                        onChange={ e => this.handleChange(e) }
                        value={this.state.passwordConfirmation}
                        required ></input>
                </label>

                <label className="formLabel">
                    USERNAME:
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        className="formInput" 
                        onChange={ e => this.handleChange(e) }
                        value={this.state.username}
                        required></input>
                </label>

                <label className="formLabel">
                    NAME:
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="formInput" 
                        onChange={ e => this.handleChange(e) }
                        value={this.state.name}
                        required></input>
                </label>

                <input 
                    type="submit" 
                    className="customButton userFormButton" 
                    value="Sign Up"></input>
            </form>
            </>
        )
    }

}

// const mapStateToProps = state => {
//     return({

//     })
// }

const mapDispatchToProps = dispatch => {
    return({
        createUser: signupPacket => dispatch(createUser(signupPacket))
    })
}

export default connect(null, mapDispatchToProps)(SignupForm)

// export default SignupForm