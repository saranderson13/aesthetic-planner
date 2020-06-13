import React, { Component } from 'react'
import LoginForm from '../components/loginForm'

class LoginPageContainer extends Component {

    render() {
        return (
            <div id="userNotLoggedIn">
                <aside id="controlsContainer">
                    < LoginForm />
                </aside>
                <section id="bodyContainer" className="userFormBodyContainer">
                    {/* {"Something Decorative"} */}
                </section>
            </div>
        )
    }

}

export default LoginPageContainer