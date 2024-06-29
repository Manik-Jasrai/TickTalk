import { useRecoilState } from "recoil"
import { userState } from "../atoms/userState"
import axios from "../api/axios";

const useRefreshToken = () =>  {

    const [user,setUser] = useRecoilState(userState);

    const refresh = async () => {
        try {
            const response = await axios.post('/refresh');

            // set user with access token
            const token = response.data.accessToken
            setUser({...user,token })
        } catch (err) {
            setUser({username : null,token : null});
        }
    }
    return refresh;
}

export default useRefreshToken