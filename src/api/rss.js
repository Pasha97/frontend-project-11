import axios from "axios";
import { parserRSS } from "../utils/parser.js";

export const loadRssFeed = (url) => {
    const baseUrl = `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`

    return axios.get(baseUrl)
        .then(response => {
            const { status, contents } = response.data;

            if (status.http_code !== 200) {
                throw new Error('messages.errors.network');
            }

            return parserRSS(contents)
        })
}