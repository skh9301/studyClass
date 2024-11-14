import axios, { AxiosResponse } from "axios";

export const postNoticeApi = async <T>(api: string, param: object) => {
  try {
    const result: AxiosResponse<T> = await axios.post(api, param);
    console.log(result.data);
    return result.data;
  } catch (error) {
    alert(error);
  }
};
