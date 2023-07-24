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