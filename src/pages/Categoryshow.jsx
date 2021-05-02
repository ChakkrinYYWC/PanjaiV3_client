import React, { useEffect, useState } from 'react';
import Categoshow from '../components/category/categoryshow'
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";

import User from '../components/admin/User'
import Noti_report from '../components/admin/Noti'
import Black from '../components/admin/Blacklist'


function Categoryshow({ classes, ...props }) {

    const [currentId, setCurrentId] = useState(props)

    console.log(props)

    return (
        <>

            <Categoshow {...{ currentId, setCurrentId }} />

            <Black />
            <User />

            <Noti_report />
            <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />

        </>
    );
}
export default Categoryshow;