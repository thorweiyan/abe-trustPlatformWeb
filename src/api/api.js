let host = "/api/";
import axios from "axios";
import ElementUI from 'element-ui'

export default {
  generateRsaKeys: host + "/common/rsa",
  DABEUser: host + "/dabe/user",
  platUser: host + "/user/",
};

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then((res) => {
      console.log(res)
      if (res.data.code === 200) {
        resolve(res);
      } else {
        throw res
      }
    }).catch((err) => {
      ElementUI.Message(err.data.message)
      reject(err);
    });
  });
}

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params).then((res) => {
      console.log(res)
      if (res.data.code === 200) {
        resolve(res);
      } else {
        throw res
      }
    }).catch((err) => {
      ElementUI.Message(err.data.message)
      reject(err);
    });
  });
}