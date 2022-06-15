import { guid } from "@/helpers/common/common";
import { shopLocation } from "@/helpers/contants/constants";
import { getUserLogged } from "@/helpers/utils/sesstion-storage/session-storage";

const {shopBasicInfo} = getUserLogged();

const CLIENT_FIELD = {
    sex: '3',
    clientId: '',
    clientName: '',
    imagePath: null,
    imageName: null,
    memberNumber: null,
    mobileNumber: '',
    clientImageId: null,
    clientGroupId: null,
    registrationDate: new Date(),
    createdDateTimeTS: '',
    clientGroupName: null,
    clientInputDateTimeTS: '',
    country: shopBasicInfo.countryCode,
    shopId: shopBasicInfo.shopId,
    sessionToken: guid(),
    shopLocation: shopLocation[shopBasicInfo.countryCode],
    allowedMessageType: 3, // not message
    memberType: 1, // member
};

const CLIENT_IMAGE_FIELD = {
    shopId: shopBasicInfo.shopId,
    clientId: null,
    formFile: null,
    countryCode: shopBasicInfo.countryCode,
}

class ClientModel {
    client = {...CLIENT_FIELD};
    clientGroups = [];
    clientImage = {...CLIENT_IMAGE_FIELD}

    resetClientField() {
        this.client = Object.assign({}, CLIENT_FIELD);
    }

    resetClientImage() {
        this.clientImage = Object.assign({}, CLIENT_IMAGE_FIELD);
    }

    setClientGroup(clientGroupData) {
        this.clientGroups = [...clientGroupData];
    }

    mapClientImageField(data) {
        const {shopId, clientId, formFile, countryCode} = data;

        const form_data = new FormData()
        form_data.append('shopId', shopId)
        form_data.append('clientId', clientId)
        form_data.append('fomrFile', formFile)
        form_data.append('countryCode', countryCode)

        return form_data
    }
}

export default ClientModel;