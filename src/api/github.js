/**
 * @author Victor Andrade <victor.andrade@caixamagica.pt>,
 *
 * @description Users - request API external (users github)
 *
 * @version 20200120
 * @since 20200120 Initial release
 *
 */
import axios from "axios";
import { CONFIG_HEADERS } from "../constants/Endpoints";

const CancelToken = axios.CancelToken;
let cancel;

/**
 * getExamples
 *
 * @param payload
 * @returns {Promise<AxiosResponse<T>>}
 */

export const getUsers = (payload) => {
  cancel && cancel();
  return axios
    .get("https://api.github.com/search/users?q=c&per_page=50", {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
      headers: CONFIG_HEADERS(),
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getUserInfo = (login) => {
  return axios
    .get(`https://api.github.com/users/${login}`, {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
      headers: CONFIG_HEADERS(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
