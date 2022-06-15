import {callApi} from '@/config/http';

const clientApis = {
    getAllClient: (payload) => {
        return callApi('/api/read/v1/clients/Client/Active', payload, 'POST')
    },
    getClientSetup: (shopId) => {
        return callApi('/api/read/v1/clients/Client/ShopInfo', shopId);
    },
    createNewClient: (payload) => {
        return callApi('/api/aggr/v1/Client/CreateClient', payload);
    },
    createClientImage: (payload) => {
        return callApi('/api/cmd/v1/clients/ClientImage', payload);
    }
}

export default clientApis;