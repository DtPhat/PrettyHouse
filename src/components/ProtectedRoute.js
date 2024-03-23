import { Navigate, Outlet, useLocation } from "react-router-dom"

const ProtectedRoute = () => {
  const userInfo = localStorage.getItem('userInfo')
  const isAdmin = JSON.parse(userInfo || null)?.accountId?.role === "ADMIN"
  return (
    isAdmin
      ? <Outlet />
      : <Navigate to="/" />
  )
}
export default ProtectedRoute