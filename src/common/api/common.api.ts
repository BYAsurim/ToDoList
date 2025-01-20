import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e7e3f008-e2dc-4435-835d-1184d4097cbd',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': '23b5595e-aea0-49dd-b0bd-985173c8779d'
    },
})