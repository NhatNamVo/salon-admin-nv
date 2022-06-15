import { BASE_URL_SERVICE } from "@/config/service-http"
import { SERVICE_TYPE } from "../contants/constants";

const apiUrlGeneration = {

    [SERVICE_TYPE.AGG] : (version, serviceName = '') => {
        return BASE_URL_SERVICE + '/api/aggr/v' + version + serviceName;
    },

    [SERVICE_TYPE.READ]: (version, serviceName) => {
        return BASE_URL_SERVICE + '/api/read/v' + version + '/' + serviceName
    },
    
    [SERVICE_TYPE.CMD]: (version, serviceName) => {
        return BASE_URL_SERVICE + '/api/cmd/v' + version + '/' + serviceName
    },
}

const getServiceUrl = (serviceName, version = 1, serviceType) => {
    return apiUrlGeneration[serviceType](version, serviceName);
};

export { getServiceUrl }