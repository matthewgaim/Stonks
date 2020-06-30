import axios from 'axios';
import details from './security';

export default axios.create({
    baseURL: "https://alpha-vantage.p.rapidapi.com/query/",
    headers:{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":details.host,
        "x-rapidapi-key":details.key,
        "useQueryString":true
    }
});