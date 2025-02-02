import { authState } from "../atoms/userState"
import { useRecoilValue } from "recoil";
import { Navigate, Outlet } from "react-router-dom";
// import useRefreshToken from "../hooks/useRefreshToken";

function RequireAuth () {
    const authed = useRecoilValue(authState);
    return ( authed ? <Outlet /> : <Navigate to = "/login" replace />)
}

export default RequireAuth