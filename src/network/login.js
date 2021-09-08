import { request } from "./request";

export function statusQr() {
  return request({
    url: `/login/qr/check?key=${getQrKey().then((res) => { res.data.unikey })}`
  })
}

export function loginPh(ph, md5_pw) {
  return request({
    url: `/login/cellphone`,
    params: {
      phone: ph,
      // password: pw,
      md5_password: md5_pw
    }
  })
}

// 获取用户信息
export function getUserInfo(id) {
  return request({
    url: `/user/detail?uid=${id}`,
  })
}

// 退出登录
export function getQuit() {
  return request({
    url: `/logout`,
  })
}