import React from "react";

const Box = ({removeBox, id, boxColor, boxWidth, boxHeight }) => {

  return (
    <>
    <div key={id} style={{ backgroundColor: boxColor, width: `${boxWidth}px`, height: `${boxHeight}px`} }>
        <h3 style={{color: 'red'}}>Box Div</h3>
    </div>
    <p onClick={() => removeBox(id)}>X</p>
    </>
  )
}

export default Box;