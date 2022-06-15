import { DEFAULT } from "@/helpers/contants/constants";

export const getUserLogged = () => {
    return JSON.parse(sessionStorage.getItem(DEFAULT.storageSavedName));
};

export const setUserLogin = (authInfo) => {
    sessionStorage.setItem(DEFAULT.storageSavedName, JSON.stringify(authInfo));
};

export const removeUserLogged = () => {
    sessionStorage.removeItem(DEFAULT.storageSavedName);
};
