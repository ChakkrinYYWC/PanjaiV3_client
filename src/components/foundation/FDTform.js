import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

const generatePayload = require('promptpay-qr');

const FDTform = () => {
    const [phoneNumber, setPhoneNumber] = useState('0918157613');
    const [amount, setAmount] = useState();
    const [qrCode, setqrCode] = useState("sample");

    function handlePhoneNumber(e) {
        setPhoneNumber(e.target.value);
    }
    function handleAmount(e) {
        setAmount(parseFloat(e.target.value));
    }
    function handleQR() {
        setqrCode(generatePayload(phoneNumber, { amount }));
    }
    return (
       
        <div align="center">
            <h2>บริจาค</h2>
            {/* <input type="text" value={phoneNumber} onChange={handlePhoneNumber} /> */}
            <input type="number" value={amount} onChange={handleAmount} />
            <button onClick={handleQR}>ยืนยัน</button><br />
            <If condition={qrCode == 'sample'}>
                <Then>
                    <>
                    </>
                </Then>
                <Else>
                    <QRCode value={qrCode} />
                </Else>
            </If>
        </div>
        
    );
}
export default FDTform;