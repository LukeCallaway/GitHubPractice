import React, {useState} from 'react'

import { useNavigate, useParams } from 'react-router-dom'

const Color = () => {
    const params = useParams();
    const navigate = useNavigate()

    return(
    <>
       <h1>Preview of Color: {params.colorName}</h1>
       <div 
            className='color-preview'  style={
            {backgroundColor: `${params.colorName}`, width: '300px', height: '300px'}
        }> 
        </div>
        <button onClick={() => navigate('/colors')}> Go Back </button>
    </>
    )
}

export default Color;