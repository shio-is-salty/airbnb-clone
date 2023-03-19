import { useState } from "react"

import axios from "axios"
import { Link } from "react-router-dom"
export const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function registerUser(e) {
    e.preventDefault()
    try{
      axios.post('/register', {
        name,
        email,
        password,
      })
      alert('Registration Successful. Now you can log in')
    }catch(e){
      alert('Registration failed please try again later')
    }



  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input 
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="John Doe" />

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder={"your@email.com"} />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="password"/>
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?
            <Link to={'/login'} className="text-black"> Register</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
