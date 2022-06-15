import { callApi } from "@/config/http"

const authApis = {
    login: (payload) => {
        return callApi('/api/aggr/v1/Auth/Login/Subscriber', payload);
    }
};

export default authApis;