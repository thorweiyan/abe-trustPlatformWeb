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

export function applyCreateOrg(fileName, t, n, users, orgName,) {
    return post(api.applyCreateOrg, {
        "fileName": fileName, "t": t, "n": n, "users": users, "orgName": orgName,
    })
}