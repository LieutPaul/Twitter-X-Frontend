import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL

export const login = async (email) => {
    try{
        await axios.post(baseURL + "/auth/login", {email:email});
        return true;
    }catch (e){
        return false;
    }
}

export const authenticate = async (email,token) => {
    try{
        const response = await axios.post(baseURL + "/auth/authenticate", {email:email, emailToken : token});
        return response;
    }catch (e){
        return false;
    }
}

