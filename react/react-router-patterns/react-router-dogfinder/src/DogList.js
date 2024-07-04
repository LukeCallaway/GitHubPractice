import React from 'react'

import { useNavigate } from 'react-router-dom'

const DogList = ({dogs}) => {

    const navigate = useNavigate()
    return(
    <>
        <h1>List of Dogs</h1>
        {dogs.map(dog => 
        <div onClick={() => navigate(`${dog.name}`)}>
            <img src={require(`./${dog.src}.jpg`)} alt='image of dog'></img>
        </div>
        )}
    </>
    )
}

export default DogList;