import { useEffect, useState } from "react";
import axios from "../api/axiosWithInterpretor";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userState";

const NewUser = ({ socket }: any) => {
  const [username, setUsername] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const user = useRecoilValue(userState);

  const handleInvite = async (e: any) => {
    e.preventDefault();
    if (username && user.username !== username) {
        try {
            const response = await axios.get(`/user/check/${username}` ,
                {
                    headers : {
                        Authorization : `Bearer ${user.token}`
                    }
                }
            );
            if (!response.data.result) {
                setErrMsg(response.data.message);
            } else {
                // create an Invite Message
                const messageObject = {
                    sender : user.username,
                    receiver : username,
                    content : 'Invited You for a Chat'
                }
                socket.send(JSON.stringify(messageObject));
                setUsername("");
            }
        } catch (e) {
            setErrMsg("Invalid Data");
        } 
        
    } else {
        setErrMsg("Enter all the fields")
    }
  };

  useEffect(()=>setErrMsg(""),[username]);

  return (
    <div className="flex items-center justify-center w-3/4 min-h-screen">
      <div className="flex flex-col w-3/4 max-w-md p-8 space-y-4">
        <h1 className="text-2xl font-semibold text-center text-white">Invite for a Chat</h1>
        <form onSubmit={handleInvite} className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label className="text-gray-400">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-3 py-2 rounded"
            />
          </div>
          {errMsg && <p className="text-sm text-red-600">{errMsg}</p>}
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
          >
            Invite
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
