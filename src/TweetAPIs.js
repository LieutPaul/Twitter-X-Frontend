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
        return response.data;
    }catch (e) {
        console.log(e);
        return null;
    }
}

export const getTweetFromId = async (tweetId) => {
    try{
        const response = await axios.get(baseURL + "/tweets/" + tweetId, config);
        return response.data;
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

export const getUserId = async (toSet,setUserId) => {
    try{
        const user = await axios.get(baseURL + "/users/getByJWT", config);
        if(user){
            const userId = user.data;
            if(toSet) setUserId(userId);
            return true;
        }else{
            return null;
        }
    }catch (e){
        console.log(e);
        return null;
    }
}

export const LikeTweet = async(userId, tweetId) => {
    try{
        const response = await axios.post(baseURL + "/tweets/likeTweet", {userId: userId, tweetId : tweetId}, config);
        if(response){
            return true;
        }else{
            return null;
        }
    }catch (e){
        console.log(e);
        return null;
    }
}

export const unLikeTweet = async(userId, tweetId) => {
    try{
        const response = await axios.post(baseURL + "/tweets/unLikeTweet", {userId, tweetId},config);
        if(response){
            return true;
        }else{
            return null;
        }
    }catch (e){
        console.log(e);
        return null;
    }
}

export const reTweet = async(userId, tweetId) => {
    try{
        const response = await axios.post(baseURL + "/tweets/reTweet", {userId: userId, tweetId : tweetId}, config);
        if(response){
            return true;
        }else{
            return null;
        }
    }catch (e){
        console.log(e);
        return null;
    }
}

export const unReTweet = async(userId, tweetId) => {
    try{
        const response = await axios.post(baseURL + "/tweets/unReTweet", {userId, tweetId},config);
        if(response){
            return true;
        }else{
            return null;
        }
    }catch (e){
        console.log(e);
        return null;
    }
}

export const addComment = async(userId, tweetId, comment) => {
    const body = {
        userId : userId,
        tweetId : tweetId,
        content : comment
    };
    
    try{
        const response = await axios.post(baseURL + "/tweets/addComment", body,config);
        if(response){
            return true;
        }else{
            return null;
        }
    }catch (e){
        console.log(e);
        return null;
    }
}