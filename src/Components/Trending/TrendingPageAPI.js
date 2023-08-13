import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL

const config = {
    headers : {
        'Authorization' : "Bearer " + localStorage.getItem("Twitter JWT")
    }
}

export const getTweetsFromTrend = async (trend) => {
    try{
        const response = await axios.get(baseURL + `/tweets/trending?trend=${trend}`, config);
        return response.data;
    }catch (e){
        console.log(e);
        return null;
    }
}