import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:5000/'
    baseURL: 'https://we-share.club/'
})


export default instance;