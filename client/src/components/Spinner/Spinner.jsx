import React from 'react'
import './Spinner.css'

const spinner = '../public/spinner.gif'

const Spinner = () => {
    return (
        <div className="container-spinner">
            <img src={spinner} alt="spinner" />
            <span className='span-spinner'> Cargando Drivers...</span>
        </div>
    )
}

export default Spinner