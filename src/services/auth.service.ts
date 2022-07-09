import axios from 'axios';

export const _get_ = (url: string) => {
  return axios.get(url).then(({ data }) => {
    return data;
  })
};

export const _post_ = (url: string, data: any = {}, options: any = {}) => {
  return axios.post(url, data, options).then(({ data }) => {
    return data;
  })
}
