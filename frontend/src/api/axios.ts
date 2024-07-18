import axios from "axios";
const PROD_URL = "https://618013e6-f12f-4e54-9967-c0a24dad1bf6-00-1wqxjggjuttbz.sisko.replit.dev/"
const BASE_URL = "http://localhost:3000"

export default axios.create({
    baseURL: PROD_URL || BASE_URL
});