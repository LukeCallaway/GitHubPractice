import React from 'react'
import {useParams} from 'react-router-dom'

const DogDetails = ({dogs}) => {
    const params = useParams()
    const dog = dogs.filter(dog => dog.name === params.name)[0]

    return(
    <>
        <h2>{dog.name}</h2>
        <ol>
            {dog.facts.map(fact => <li>{fact}</li>)}
        </ol>
        <img src={require(`./${dog.src}.jpg`)} alt='image of dog'></img>

    </>
    )
}

export default DogDetails;