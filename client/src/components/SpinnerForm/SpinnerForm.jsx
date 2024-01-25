import React from 'react'
import './SpinnerForm.css'

const spinner = '../public/spinner.gif'

const SpinnerForm = () => {
    return (
        <div className="container-spinner">
            <img src={spinner} alt="spinner" />
            <span className='span-spinner'> Loading Form...</span>
        </div>
    )
}

export default SpinnerForm