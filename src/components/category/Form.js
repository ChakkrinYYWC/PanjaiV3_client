import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import Button from '@material-ui/core/Button';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import useForm from '../PostPanjai/useForm'
import uuid from "uuid";
import axios from 'axios';
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";
import './Form.css'

const fdt_coin = [
    {
        id: uuid(),
        coin: 10
    },
    {
        id: uuid(),
        coin: 25
    },
    {
        id: uuid(),
        coin: 50
    },
    {
        id: uuid(),
        coin: 100
    },
    {
        id: uuid(),
        coin: 250
    }
]


const Form = ({ ...props }) => {

    const currentUserID = localStorage.getItem("currentUser_id")
    const user_coin = localStorage.getItem("currentUser_coin")
    const [mycoin, setMycoin] = useState(user_coin);
    const [post_id, setPost_id] = useState(props._id);
    const [money, setMoney] = useState(props.money);
    var newcoin = 0;

    console.log(user_coin)

    const onSuccess = () => {
        ButterToast.raise({
            content: <Cinnamon.Crisp title="มูลนิธิ"
                content="บริจาคสำเร็จ"
                scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                icon={<AssignmentTurnedIn />}
            />
        })
        window.location.href = "/Foundation/" + props.category + "/" + props._id

    }
    console.log(props)

    const handleSubmit = async (coin) => {

        await axios.post('/authenticate/information/' + currentUserID, {
        }).then(async res => {
            //console.log(res.data)
            newcoin = res.data.coin - coin

            if (window.confirm('คุณต้องการที่จะบริจาค ' + coin + ' เหรียญ ใช่หรือไม่?')) {

                if (newcoin < 0) {

                    if (window.confirm('เหรียญของคุณไม่เพียงพอ กรุณาเติมเหรียญ')) {
                        window.location.href = "/pay-coin"

                    } else {
                        window.location.href = "/Foundation/" + props.category + "/" + props._id
                    }
                    
                }else {

                    console.log(newcoin)
                    console.log(post_id)
                    const data = { newcoin, coin, post_id, money }
                    axios.post('/authenticate/mycoin/' + currentUserID, data, {
                    }).then(res => {
                        localStorage.setItem("currentUser_coin", res.data.coin)
                        setMycoin(res.data.coin)
                        console.log(res.data.coin)
                        onSuccess()
                    }).catch(error => console.log(error))
                }

            }

                
        }).catch(error => console.log(error))

    }

    return (
        <div className="coindonate" align="center">
            <h1><i class="fas fa-coins"></i> เหรียญของฉัน : {mycoin}</h1>
            {
                fdt_coin.map(c => (
                    <>
                        <Button className="btcoindonate"
                            onClick={() => handleSubmit(c.coin)}
                            color="primary"
                        >
                            {c.coin} เหรียญ
                        </Button><br />
                    </>
                ))
            }

        </div>
    );
}
export default Form;

// <If condition={qrCode == 'sample'}>
// <Then>
//     <>
//         <h1>กรอกจำนวนเงิน</h1>
//         <input type="number" value={amount} onChange={handleAmount} />
//         <Button onClick={handleQR} color="primary">ยืนยัน</Button><br />
//     </>
// </Then>
// <Else>
//     <QRCode value={qrCode} />
// </Else>
// </If>