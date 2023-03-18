import { Header } from "./Header"
import { Outlet } from "react-router-dom"
export const Layout = () => {
  return (
    <div className="p-4 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  )
}
