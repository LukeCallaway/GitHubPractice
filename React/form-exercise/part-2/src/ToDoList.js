import React, { useState } from 'react'
import ToDo from './ToDo'
import NewToDoForm from './NewToDoForm'
import { v4 as uuid } from 'uuid';

function ToDoList() {
    // test to see if div appear
    const INITIAL_STATE = [
        { id: uuid(), name: 'todo number 1'},
    ]
    const [todos, setTodos] = useState(INITIAL_STATE);
    const addToDo = (name) => {
        setTodos(todos => [...todos, {name:name,  id: uuid() }])
    }
    const removeToDo = (id) =>{
        setTodos(todos.filter( i => i['id'] !== id))
    }

    return (
        <div>
            <h2>ToDoList</h2>
            <NewToDoForm addToDo={addToDo}/>

            <div className='todos'>
                {todos.map(({ id, name}) =>
                    <ToDo id={id} name={name} removeToDo={removeToDo} />)}
            </div>
        </div>
  );
}

export default ToDoList;