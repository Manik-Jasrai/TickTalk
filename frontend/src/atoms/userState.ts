import { atom, selector } from "recoil";

type user = {
    username : string | null;
    token : string | null;
}
export const userState = atom<user>({
    key : 'User',
    default : {
        username : null,
        token : null
    }
});

export const authState = selector<boolean>({
    key : 'Auth',
    get : ({get}) => {
        const { username,token } = get(userState);
        if (username && token) return true;
        else return false;
    }
})


