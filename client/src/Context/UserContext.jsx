import { useState, useEffect, createContext } from "react"
import axios from "axios"

export const UserContext = createContext({})

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    if(!user){
      const {data} = axios.get('/profile').then(() => {
        setUser(data)
      })
    }
  }, [])
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}
