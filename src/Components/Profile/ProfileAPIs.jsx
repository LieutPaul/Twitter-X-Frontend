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

export const getLikedTweetsByUser = async (userId, setLikedTweets) => {
    try{
        const response = await axios.post(baseURL + "/tweets/getLikedByUser", {userId}, config);
        setLikedTweets(response.data);
        return true;
    }catch (e) {
        console.log(e);
        return null;
    }
}

export const getRetweetedTweetsByUser = async (userId, setRetweetedTweets) => {
    try{
        const response = await axios.post(baseURL + "/tweets/getRetweetedByUser", {userId}, config);
        setRetweetedTweets(response.data);
        return true;
    }catch (e) {
        console.log(e);
        return null;
    }
}

export const getUserFromId = async (userId) => {
    try{
        const response = await axios.post(baseURL + "/users/getById", {id:userId}, config);
        return response.data;
    }catch (e){
        console.log(e);
        return null;
    }
}

export const updateUser = async (bio,username,name) => {
    bio = bio.trim(); name = name.trim(); username = username.trim();
    
    if (bio === "") bio = null

    try{
        const response = await axios.put(baseURL + "/users/updateById", {bio,name,username}, config);
        return response.data;
    }catch (e){
        console.log(e);
        return null;
    }

}

export const followUser = async (followingId) => {

    try{
        const response = await axios.post(baseURL + `/users/follow/${followingId}`, {} , config);
        return response.data;
    }catch (e){
        console.log(e);
        return null;
    }

}

export const unFollowUser = async (followingId) => {

    try{
        const response = await axios.post(baseURL + `/users/unfollow/${followingId}`, {} , config);
        return response.data;
    }catch (e){
        console.log(e);
        return null;
    }

}

export const isUserFollowing = async (followingId) => {

    try{
        const response = await axios.post(baseURL + `/users/isFollowing/${followingId}`, {} , config);
        return response.data;
    }catch (e){
        console.log(e);
        return null;
    }

}