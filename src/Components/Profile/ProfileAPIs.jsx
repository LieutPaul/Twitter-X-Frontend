import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL

const config = {
    headers : {
        'Authorization' : "Bearer " + localStorage.getItem("Twitter JWT")
    }
}

export const getTweetsByUser = async (userId, setTweets) => {
    try{
        const response = await axios.post(baseURL + "/tweets/getByUser", {userId}, config);
        setTweets(response.data);
        return true;
    }catch (e) {
        console.log(e);
        return null;
    }
}

export const getUserFromId = async (userId) => {
    try{
        const response = await axios.post(baseURL + "/users/getById", {id:userId}, config);
        console.log(response);
        return response.data;
    }catch (e){
        console.log(e);
        return null;
    }
}