import { BASE_URL_SERVICE } from "./service-http";
import { DEFAULT } from "@/helpers/contants/constants"
import { getUserLogged } from "@/helpers/utils/sesstion-storage/session-storage"
import axios from "axios"

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
    'Accept': 'application/json'
  }

export const callApi = (url, data = null, method = "POST") => {

    const authInfo = getUserLogged(DEFAULT.storageSavedName);
    const {authToken} = authInfo && authInfo.userAuthInfo || "";

    console.log(authToken)

    return axios({
        url: BASE_URL_SERVICE + url,
        method,
        data,
        headers: {
            'Authorization': `Bearer ${authToken}`,
            ...DEFAULT_HEADERS
        }
    });
};
