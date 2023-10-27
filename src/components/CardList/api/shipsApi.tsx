import axios from "axios";

import { API_URL } from "../constants/constants";

const api = axios.create({
  baseURL: API_URL,
});

async function getPosts(start, length) {
    const { data } = await api.get(`/posts?_start=${start}&_limit=${length}`);

    return data;
}

export {
  getPosts,
};