import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = ({names}) => {
    return(
    <div className='navbar'>
        {names.map(name => <p className='navbar-links'> <Link to={`/dogs/${name}`}>{name}</Link></p> )}
    </div>
    )
}

export default Navbar;