import React, { useState } from 'react'
// import './BoxList.css';
import Box from './Box'
import NewBoxForm from './NewBoxForm'
import { v4 as uuid } from 'uuid';

function BoxList() {
    // test to see if div appear
    const INITIAL_STATE = [
        { id: uuid(), boxColor: 'black', boxWidth: 100,  boxHeight: 100},
    ]
    const [boxes, setBoxes] = useState(INITIAL_STATE);
    const addBox = (boxColor, boxHeight, boxWidth) => {
        setBoxes(boxes => [...boxes, { boxColor: boxColor, boxHeight: boxHeight, boxWidth: boxWidth, id: uuid() }])
    }
    const removeBox = (id) =>{
        setBoxes(boxes.filter( i => i['id'] !== id))
    }

    return (
        <div>
            <NewBoxForm addBox={addBox}/>

            <h2>BoxList</h2>

            <div className='boxes'>
                {boxes.map(({ id, boxColor, boxWidth, boxHeight}) =>
                    <Box removeBox={removeBox} id={id} boxColor={boxColor} boxWidth={boxWidth} boxHeight={boxHeight} />)}
            </div>
        </div>
  );
}

export default BoxList;