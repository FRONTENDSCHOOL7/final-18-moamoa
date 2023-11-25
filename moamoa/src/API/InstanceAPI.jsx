import axios from 'axios'
import userTokenAtom from '../Recoil/userTokenAtom'
import { useRecoilValue } from 'recoil'

const BASE_URL = 'https://api.mandarin.weniv.co.kr';

// api요청 시 인증값이 필요없는 경우
const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options })
  return instance
}

// api요청 시 인증값이 필요한 경우
const axiosAuthApi = (url, options) => {
  const token = useRecoilValue(userTokenAtom);
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: 'Bearer ' + token },
    ...options,
  })
  return instance
}

export const defaultInstance = axiosApi(BASE_URL)
export const authInstance = axiosAuthApi(BASE_URL)