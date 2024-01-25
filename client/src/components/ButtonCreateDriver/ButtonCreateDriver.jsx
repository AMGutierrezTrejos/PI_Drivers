import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ButtonCreateDriver.css'

const ButtonCreateDriver = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const navigateToHome = () => {
        setLoading(true);

        navigate('/spinnerForm')

        setTimeout(() => {
            setLoading(false);
            navigate('/formPage');
        }, 2000);

    }
    return (
        <div className='container-button'>
            <button onClick={navigateToHome} className='Button-create' title='Create Driver'>
                <Link className='NavLink-button'>New Driver </Link>
            </button>
        </div>

    )
}

export default ButtonCreateDriver