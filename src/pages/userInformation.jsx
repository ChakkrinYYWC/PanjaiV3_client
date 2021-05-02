import React from 'react';
import Profile from "../components/Profile/profile";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";

function userInformation() {
    return (
        <>
            <Profile />
            <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />
        </>

    )
}

export default userInformation;