import React, { useState } from "react";

const AddColorForm = ({ addColor }) => {
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
    addColor({ ...formData});
    setFormData(INITIAL_STATE)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Color</label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Color Name"
        value={formData.name}
        onChange={handleChange}
      />
      <button>Add Color</button>
    </form>
  )

}

export default AddColorForm;