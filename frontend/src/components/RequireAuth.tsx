import { authState } from "../atoms/userState"
import { useRecoilValue } from "recoil";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth () {
    const authed = useRecoilValue(authState);
    console.log(authed)
    return ( authed ? <Outlet /> : <Navigate to = "/login" replace />)
}

export default RequireAuth