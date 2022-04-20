import axios, {AxiosResponse} from 'axios'

// @ts-ignore
const RUN_AS_SUBDOMAIN = !!import.meta.env.VITE_RUN_AS_SUBDOMAIN

const baseURL = RUN_AS_SUBDOMAIN ?
  (location.protocol + '//www' + location.hostname.substr(location.hostname.indexOf('.'))) :
  location.origin

export const api = axios.create({baseURL, withCredentials: location.protocol === 'https:'})

export const getCallData = (res: AxiosResponse) => {
  return res?.status >= 300 ? Promise.reject(new Error('failed to call url')) : res?.data
}
