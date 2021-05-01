import React, { Component } from 'react';
import PayForm from '../components/payment/PayForm';
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";



class Coin extends Component {


    render() {

        return (
            <>
                <PayForm/>
                <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />
            </>
        );
    }
}

export default Coin;