import React, { useEffect, useState } from 'react';
import Categoshow from '../components/category/categoryshow'
import { store } from "../action/store";
import { Provider } from "react-redux";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";

import User from '../components/admin/User'
import Noti_report from '../components/admin/Noti'
import Black from '../components/admin/Blacklist'


function Categoryshow({ classes, ...props }) {

    const [currentId, setCurrentId] = useState(props)

    console.log(props)

    return (
        <>
            <Provider store={store}>
                <Categoshow {...{ currentId, setCurrentId }} />
            </Provider>
            <Black />
            <User />
            <Provider store={store}>
                <Noti_report />
                <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />
            </Provider>
        </>
    );
}
export default Categoryshow;