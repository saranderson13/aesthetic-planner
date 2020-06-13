import React, { Component } from 'react'
import SignupForm from '../components/signupForm'

class SignupPageContainer extends Component {

    render() {
        return (
            <div id="userNotLoggedIn">
                <aside id="controlsContainer">
                    < SignupForm />
                </aside>
                <section id="bodyContainer" className="userFormBodyContainer">
                    {/* {"Something Decorative"} */}
                </section>
            </div>
        )
    }

}

export default SignupPageContainer 