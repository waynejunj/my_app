import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const Signup = () => {

  const[username,setUsername] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[phone,setPhone] = useState("")

  const[loading,setLoading] = useState("")
  const[success,setSuccess] = useState("")
  const[error,setError] = useState("")

  const submit = async (e) => {
    e.preventDefault()
    setLoading("Please wait...")

    try{
      const data = new FormData()
      data.append("username",username)
      data.append("email",email)
      data.append("password",password)
      data.append("phone",phone)

      const response = await axios.post("https://eguman.pythonanywhere.com/api/signup",data)

      if (response.data.success){
        setLoading("")
        setSuccess(response.data.success)

        setUsername("")
        setEmail("")
        setPassword("")
        setPhone("")
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

          <h2 className='text-center'>Sign Up ✔️</h2>

          {success}
          {loading}
          {error}

          <input 
          type="text"
          placeholder='Enter Username'
          className='form-control my-3'
          value={username}
          onChange={(e) => {setUsername(e.target.value)}}
           />

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
          className='form-control mt-4'
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
           />

          <input 
          type="tel"
          placeholder='Phone Number'
          className='form-control my-4'
          value={phone}
          onChange={(e) => {setPhone(e.target.value)}}
           />

          <div className='d-flex justify-content-center align-items-center'>
            <button 
            type="submit"
            className='btn btn-primary px-5'>
              Sign Up 🚀
            </button>
          </div>
          <br />
          <p className='text-center'>Already have an Account? <Link to="/signin">Sign in</Link> </p>

        </form>
       </div>
    </div>
  )
}

export default Signup