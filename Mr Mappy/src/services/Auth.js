import { getUserData, removeUserData } from "./Storage"


export const isAuthenticated = () => {
    return getUserData() != null ? true : false;
}


//logout
export const logout=()=>{
   removeUserData()
}