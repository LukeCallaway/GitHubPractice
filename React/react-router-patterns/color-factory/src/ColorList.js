import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import AddColorForm from './AddColorForm'

const ColorList = () => {
    const navigate = useNavigate()
    const [colors, setColors] = useState([])
    const addColor = (newColor) => {
        setColors(colors => [...colors, newColor])
    }

    return(
    <>
        <h1>Color List</h1>
        <AddColorForm addColor={addColor} />
        <ol>
            {colors.map(color =>
                <li onClick={() => navigate(`${color.name}`)}>{color.name}</li>)}
        </ol> 
    </>
    )
}

export default ColorList;