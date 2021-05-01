import React from 'react';
import { Provider } from "react-redux";
import { store } from "../action/store";
import Profile from "../components/Profile/profile";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";

function userInformation() {
    return (
        <Provider store={store} >
            <Profile />
            <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />
        </Provider>

    )
}

export default userInformation;