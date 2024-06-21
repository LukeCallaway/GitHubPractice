import React, {useState} from 'react'
// import './BoxList.css';
import Box from './BoxList'

const NewBoxForm = ({ addBox }) => {
  const INITIAL_STATE = {
    color: '',
    width: '',
    height: ''
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
    addBox(formData.color, formData.height, formData.width);
    setFormData(INITIAL_STATE)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="color">Color</label>
      <input
        id="color"
        type="text"
        name="color"
        placeholder="Pick a Color"
        value={formData.color}
        onChange={handleChange}
      />
      <label htmlFor="width">Width in Pixels</label>
      <input
        id="width"
        type="text"
        name="width"
        placeholder='Pick a Width'
        value={formData.width}
        onChange={handleChange}
      />
      <label htmlFor="height">Height in Pixels</label>
      <input
        id="height"
        type="text"
        name="height"
        placeholder='Pick a Height'
        value={formData.height}
        onChange={handleChange}
      />
      <button>Add Box</button>
    </form>
    
  )

}

export default NewBoxForm;