import axios from 'axios'

const api = axios.create({
    url: "http://localhost:3000"
})

export async function invokeFeature() {
    const response =  await api.post("/invoke")
    return response.data;
}