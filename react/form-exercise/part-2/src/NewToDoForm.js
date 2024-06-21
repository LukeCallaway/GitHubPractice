import React, {useState} from 'react'

const NewToDoForm = ({ addToDo }) => {
  const INITIAL_STATE = {
    name: ''
  }
  const [formData, setFormData] = useState(INITIAL_STATE);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    addToDo(formData.name);
    setFormData(INITIAL_STATE)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">name</label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Pick a Name"
        value={formData.name}
        onChange={handleChange}
      />
      <button>Add ToDo</button>
    </form>
    
  )

}

export default NewToDoForm;