import React from 'react'
import LoadingWheel from '../assets/images/loading-wheel.gif'

const LoadingPage = props => {
    return (
        <div className="loadingWheelFormatter">
            <img src={LoadingWheel} alt="Loading" />
            <div>{props.message}</div>
        </div>
    )
}

export default LoadingPage