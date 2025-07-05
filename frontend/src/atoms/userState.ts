import { atom, selector } from "recoil";

type user = {
    username : string | null;
    token : string | null;
    profile : string;
}
export const userState = atom<user>({
    key : 'User',
    default : {
        username : null,
        token : null,
        profile : 'default.jpg'
    }
});

export const authState = selector<boolean>({
    key : 'Auth',
    get : ({get}) => {
        const { username, token } = get(userState);
        if ( username && token) return true;
        else return false;
    }
})

export const authLoadedAtom = atom<boolean>({
  key: 'AuthLoaded',
  default: false,
});


