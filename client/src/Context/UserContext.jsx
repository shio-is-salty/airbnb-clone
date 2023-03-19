import { useState, useEffect, createContext } from "react"
import axios from "axios"

export const UserContext = createContext({})

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if(!user){
      const {data} = axios.get('/profile').then(() => {
        setUser(data)
        setReady(true)
      })
    }
  }, [])
  return (
    <UserContext.Provider value={{user, setUser, ready}}>
      {children}
    </UserContext.Provider>
  )
}
