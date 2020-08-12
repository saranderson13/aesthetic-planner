import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignupForm from '../components/signupForm'
import LoadingPage from './loadingPageContainer'

class SignupPageContainer extends Component {

    render() {
        if( this.props.loadingUser) {
            return (
                <LoadingPage message={"One moment...your account is being created."}/>
            )
        } else {
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

}


const mapStateToProps = state => {
    return ({
        loadingUser: state.user.loading_user
    })
}

export default connect(mapStateToProps)(SignupPageContainer) 