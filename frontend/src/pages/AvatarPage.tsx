import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userState";
import { useNavigate } from "react-router-dom";

const avatars = [
  "default.jpg",
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
];

const AvatarPage = () => {
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const [user , setUser] = useRecoilState(userState);
  const [errMsg, setErrMsg] = useState<string>("");

  const navigate = useNavigate();

  useEffect(()=> {
    setErrMsg("");
  },[newAvatar])
  const saveProfile = async () => {
    if (newAvatar ){

        try {
            await axios.post('/user/profile',{
            profile : newAvatar
        },{
            headers : {
                Authorization : `Bearer ${user.token}`
            }
        })
        const newUser = {...user , profile : newAvatar};
        setUser(newUser); 
        navigate('/');
        } catch(e) {
            
        }
    } else {
        setErrMsg("Please Select an Avatar");
    }
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-6">
        <div className="absolute top-4 right-4">
        <button
          className="text-gray-100"
          onClick = {() => navigate('/')}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center w-full space-y-6 max-w-3xl">
        <h1 className="text-2xl font-semibold text-gray-100">Select Your Avatar</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {avatars.map((av, index) => (
            <img
              key={index}
              src={`/${av}`}
              alt={`avatar ${index}`}
              className={`w-20 h-20 rounded-full cursor-pointer transition-transform transform hover:scale-110 ${
                newAvatar === av ? "ring-4 ring-blue-500" : ""
              }`}
              onClick={() => setNewAvatar(av)}
            />
          ))}
        </div>
        {errMsg && <p className="text-sm text-red-600">{errMsg}</p>}
        <button
          className="px-4 py-2 font-semibold text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
          onClick={saveProfile}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AvatarPage;
