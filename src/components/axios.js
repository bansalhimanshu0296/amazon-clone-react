import axios from "axios";

const instance = axios.create({
    baseURL: 'https://us-central1-clone-6d5b3.cloudfunctions.net/api'
})

export default instance