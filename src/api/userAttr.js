import api from "./api";
import { post, get } from "./api";
import qs from "qs"

export function DABEGenerateUserAttr(fileName, attrName) {
    return post(api.DABEUserAttr, qs.stringify({ 'fileName': fileName, 'attrName': attrName }))
}

export function PlatGenerateUserAttr(fileName, attrName) {
    return post(api.platUserAttr, { 'fileName': fileName, 'attrName': attrName })
}

export function applyOthersAttr(fileName, attrName, toUserName, toOrgName, isPublic, remark) {
    return post(api.applyOthersAttr, { 'fileName': fileName, 'attrName': attrName, 'toUserName': toUserName, 'toOrgName': toOrgName, 'isPublic': isPublic, 'remark': remark, })
}


export function getOthersApply(toId, type, userName, status) {
    return get(api.applyOthersAttr, { params: { "toId": toId, "type": type, "userName": userName, "status": status } })
}
