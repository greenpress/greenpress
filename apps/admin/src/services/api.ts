import axios, { AxiosResponse } from 'axios'

const baseURL = location.hostname.includes('.') ? (location.protocol + '//www' + location.hostname.substr(location.hostname.indexOf('.'))) : location.origin

export const api = axios.create({ baseURL, withCredentials: location.protocol === 'https:' })

export const getCallData = (res: AxiosResponse) => {
  return res?.status >= 300 ? Promise.reject(new Error('failed to call url')) : res?.data
}
