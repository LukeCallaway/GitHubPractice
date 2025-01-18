import React from 'react'
import {Link} from 'react-router-dom'

const VendingMachine = () => {
    return(
    <>
        <h1>Vending Machine</h1>
        <p>< Link to='/water'>Water</Link></p> 
        <p>< Link to='/tea'>Tea</Link></p> 
        <p>< Link to='/soda'>Soda</Link></p> 
    </>
    )
}

export default VendingMachine;