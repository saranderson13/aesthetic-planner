import React, { Component } from 'react'

class LoginForm extends Component {

    state = {
        email: "",
        password: ""
    }

    handleChange = e => {
        this.setState({ [e.target.id]: [e.target.value]  })
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log("Submitting Form")
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
                            onChange={ e => this.handleChange(e) }></input>
                    </label>

                    <label className="formLabel">
                        PASSWORD:
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className="formInput" 
                            onChange={ e => this.handleChange(e) }></input>
                    </label>

                    <input type="submit" className="customButton userFormButton" value="Log In"></input>
                </form>
            </div>
        )
    }

}

export default LoginForm