import api from "./api";
import { post, get } from "./api";
import qs from "qs"


export function getOrgApply(orgName, type) {
    return get(api.orgApply, { params: { "orgName": orgName, "type": type } })
}

export function getOrgAttrApply(orgName, type, attrName) {
    return get(api.orgApply, { params: { "orgName": orgName, "type": type, "attrName": attrName } })
}

export function getOrgInfo(orgName) {
    return get(api.org, { params: { "orgName": orgName } })
}
