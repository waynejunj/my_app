import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")

  const[loading,setLoading] = useState("")
  const[success,setSuccess] = useState("")
  const[error,setError] = useState("")
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading("Please wait...")

    try{
      const data = new FormData()
      data.append("email",email)
      data.append("password",password)

      const response = await axios.post('https://eguman.pythonanywhere.com/api/signin',data)

      if (response.data.user){
        setLoading("")
        setSuccess(response.data.success)

        navigate("/")
      }
      

    }
    catch (error){
      setLoading("")
      setError(error.mesage)
    }

  }
  return (
    <div className='row justify-content-center p-4'>
       <div className="col-md-6 card shadow mt-4 p-5">

        <form onSubmit={submit}>

          <h2 className='text-center'>Sign In </h2>

          {success}
          {loading}
          {error}

          <input 
          type="email"
          placeholder='Enter Email'
          className='form-control mt-4'
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
           />

          <input 
          type="password"
          placeholder='Enter Password'
          className='form-control my-4'
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
           />


          <div className='d-flex justify-content-center align-items-center'>
            <button 
            type="submit"
            className='btn btn-primary px-5'>
              Sign In 🚀
            </button>
          </div>
          <br />
          <p className='text-center'>Already have an Account? <Link to="/signup">Sign up</Link> </p>

        </form>
       </div>
    </div>
  )
}

export default Signin