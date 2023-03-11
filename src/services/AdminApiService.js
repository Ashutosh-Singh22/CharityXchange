import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

export async function adminLogin(admin){
    console.log(admin);
    return axios.post(BASE_URL+"adminLogin",admin);
}