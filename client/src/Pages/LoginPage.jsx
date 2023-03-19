import { useState, useContext } from "react"
import { Link, Navigate } from "react-router-dom"
import axios from "axios"

import { UserContext } from "../Context/UserContext"
export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false) 

  const {setUser} = useContext(UserContext)

  async function handleLoginSubmit(e){
     e.preventDefault()
     try{
       const {data} = await axios.post('/login', {email, password})
       setUser(data)
       alert('Login successful')
       setRedirect(true)
     }catch(e){
       alert('Login failed')
     }
  }

  if (redirect){
    return <Navigate to={'/'} />
  }
  return (


    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
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

          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? 
            <Link to={'/register'} className="text-black"> Register</Link>
          </div>
        </form>


      </div>
      
    </div>
  )
}
