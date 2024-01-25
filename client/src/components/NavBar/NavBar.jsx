import React from 'react'
import { Link } from 'react-router-dom'

import './NavBar.css'

const spinner = '../public/Logof1.png'
const NavBar = () => {
    return (
        <nav className='Navbar-nav'>
            <Link className='logo' to='/' >
                <img src={spinner} alt="spinner" />
            </Link>
        </nav>
    )
}

export default NavBar