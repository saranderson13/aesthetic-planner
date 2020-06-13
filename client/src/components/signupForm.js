import React, { Component } from 'react'

class SignupForm extends Component {

    state = {
        email: "",
        password: "",
        passwordConfirmation: "",
        username: "",
        name: ""
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

                <label className="formLabel">
                    CONFIRM PASSWORD:
                    <input 
                        type="password" 
                        id="passwordConfirmation" 
                        name="passwordConfirmation" 
                        className="formInput" 
                        onChange={ e => this.handleChange(e) }></input>
                </label>

                <label className="formLabel">
                    USERNAME:
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        className="formInput" 
                        onChange={ e => this.handleChange(e) }></input>
                </label>

                <label className="formLabel">
                    NAME:
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="formInput" 
                        onChange={ e => this.handleChange(e) }></input>
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

export default SignupForm