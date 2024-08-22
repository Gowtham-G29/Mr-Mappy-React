import axios from "axios"
import { getUserData } from "./Storage";


//spilt url into multiple parts
axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";
const API_KEY = "AIzaSyABMq3j3apKqBL3YB2A8qr3gFIaKn1LVLI";
const REGISTER_URL = `/accounts:signUp?key=${API_KEY}`


const LOGIN_URL = `/accounts:signInWithPassword?key=${API_KEY}`

const USER_DETAILS_URL=`/accounts:lookup?key=${API_KEY}`

export const RegisterApi = (inputs) => {
    let data = {
        displayName: inputs.name,
        email: inputs.email,
        password: inputs.password

    }
    //post is used to send the request
    return axios.post(REGISTER_URL, data);
}

export const LoginApi = (inputs) => {
    let data = {
        // displayName: inputs.name,
        email: inputs.email,
        password: inputs.password

    }
    //post is used to send the request
    return axios.post(LOGIN_URL, data);
}


export const userDetailsApi = () => {
    let data = { idToken: getUserData() }

    return axios.post(USER_DETAILS_URL, data);
}