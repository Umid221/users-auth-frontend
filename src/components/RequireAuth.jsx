import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

function RequireAuth() {
  return <div>{isAuthenticated() ? <Outlet /> : <Navigate to="/login" />}</div>;
}

export default RequireAuth;
