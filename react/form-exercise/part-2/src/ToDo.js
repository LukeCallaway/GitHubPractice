import React from "react";

const ToDo = ({id, name, removeToDo}) => {

  return (
    <div key={id} className="todo">
        <p>{name}</p>
        <p onClick={() => removeToDo(id)}>X</p>
    </div>
  )
}

export default ToDo;