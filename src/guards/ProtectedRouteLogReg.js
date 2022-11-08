import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"

// if the user is Logged in, cannot visit register or login views, and is redirect
const ProtectedRouteLogReg = () => {
  const { user } = useAuthContext()
  let location = useLocation()

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />
  } else{
    return <Outlet />
  }
}

export default ProtectedRouteLogReg