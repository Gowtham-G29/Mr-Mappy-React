export const storeUserData = (data) => {
    localStorage.setItem('idToken', data)
}

export const getUserData=()=>{
   return  localStorage.getItem('idToken');
}

export const removeUserData=()=>{
    //remove the data using key
    localStorage.removeItem('idToken')
}