import axios from 'axios'
import React, { useState } from 'react'

const UploadProduct = () => {
const[product_name, setProductName] = useState('')
const[product_description, setProductDescription] = useState('')
const[product_cost, setProductCost] = useState('')
const[product_photo, setProductPhoto] = useState('')


const[loading, setLoading] = useState()
const[succcess, setSuccess]= useState()
const[error, setError] = useState()

const handleSubmit = async (e)=>{
e.preventDefault();
setLoading('Connecting...')
try {
  const formData = new FormData();
  formData.append('product_name', product_name);
  formData.append('product_description', product_description);
  formData.append('product_cost', product_cost);
  formData.append('product_photo', product_photo);

  const response = await axios.post('https://eguman.pythonanywhere.com/api/add_product', formData)

  if(response.data.success){
    setLoading('')
    setSuccess(response.data.success)
    setProductName('')
    setProductDescription('')
    setProductCost('')
    setProductPhoto('')
  }

} catch (error) {
  setLoading('')
setSuccess('')
setError(error.message)  
}
}

  return (
    <div className='row justify-content-center mt-4'>
      <div className='card shadow col-md-6 p-2'>
        <h1>Add Products</h1>
        {loading}
        {succcess}
        {error}
      <form action="" onSubmit={handleSubmit}>
        <input type="text"
         placeholder='Enter product name'
         className='form-control'
         value={product_name}
         onChange={(e)=>{setProductName(e.target.value)}}

         /> <br />
        <textarea placeholder='Product description'
        className='form-control'
        value={product_description}
        onChange={(e)=>{setProductDescription(e.target.value)}}/> <br/>


        <input type="number"
         placeholder='Enter product cost'
          className='form-control'
        value={product_cost}
        onChange={(e)=>{setProductCost(e.target.value)}} /> <br />

        <input type="file"
         placeholder='Choose image'
          className='form-control'
          onChange={(e)=>{setProductPhoto(e.target.files[0])}}/> <br />
        <button type="submit" className='btn btn-success'>Add Product</button>
      </form>
      </div>
    </div>
  )
}

export default UploadProduct