import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL

const config = {
    headers : {
        'Authorization' : "Bearer " + localStorage.getItem("Twitter JWT")
    }
}

export const getAllUsersFromSearchedString = async (searchString) => {
    try{
        const response = await axios.post(baseURL + "/users/userFromSearch", {searchString}, config);
        return response.data;
    }catch (e){
        console.log(e);
        return null;
    }
}

export const getAllUsersFromUsernameString = async (searchString) => {
    try{
        const response = await axios.post(baseURL + "/users/usernameFromSearch", {searchString}, config);
        return response.data;
    }catch (e){
        console.log(e);
        return null;
    }
}

export const getAllTrendsFromSearchedString = async (searchTrend) => {
    try{
        const response = await axios.get(baseURL + `/tweets/trendsFromSearch?trend=${searchTrend}`, config);
        return response.data;
    }catch (e){
        console.log(e);
        return null;
    }
}

