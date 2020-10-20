import api from "./api";
import { post } from "./api";
import qs from "qs"


export function generateRsaKeys(fileName) {
    return post(api.generateRsaKeys, qs.stringify({ "fileName": fileName }));
}