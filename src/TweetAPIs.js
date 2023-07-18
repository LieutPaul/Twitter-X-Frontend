import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL

const config = {
    headers : {
        'Authorization' : "Bearer " + localStorage.getItem("Twitter JWT")
    }
}
export const getAllTweets = async (setTweets) => {
    try{
        const response = await axios.get(baseURL + "/tweets", config);
        setTweets(response.data);
        console.log(response.data);
    }catch (e) {
        console.log(e);
        return null;
    }
}

export const postTweet = async (tweet) => {
    try{
        const response = await axios.post(baseURL + "/tweets/postTweet", {content:tweet}, config);
        return response;
    }catch (e){
        console.log(e);
        return null;
    }
}