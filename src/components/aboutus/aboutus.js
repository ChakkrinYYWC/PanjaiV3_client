import React, { Component, useEffect, useState } from 'react';
import './aboutus.css'
import { Card, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

class aboutus extends Component{

    render() {
        return (
            <div className='bg'>
                <div className='bg1'>
               
               <div class="grid-container">
                <img
                        className="pic"
                        src="/nonateToopunjai.png"
                    />
                
                
                <span className='topic'>
                ปันใจ
                </span>
               
                <span className='text'>
                    
                     มีจุดประสงค์ที่จัดทำเว็บนี้ขึ้นเพื่อช่วยเหลือมูลนิธิต่าง ๆ 
                    <br/>ที่ต้องการรับความช่วยเหลือและช่วยให้คนที่อยากบริจาคสามารถ
                    <br/>บริจาคของได้อย่างง่ายขึ้น ซึ่งเป็นองค์กรที่ไม่แสวงหากำไร
                    <br/>เป็นกิจกรรมเพื่อสังคม 
                </span>
                
               
                </div>
                
                


                
                
                <span className='topic1'>
               เกณฑ์การคัดเลือกโครงการ
                </span>
               
                <span className='text1'>
                1. เป็นโครงการที่สร้างประโยชน์ต่อสังคม วัดผลได้จริงและมีประสิทธิภาพ
                    <br/>2. เป็นโครงการที่เน้นความคิดสร้างสรรค์ สร้างประโยชน์แก่ชุมชนและสังคมในแง่มุมใหม่ มีความยั่งยืน 
                    <br/>3. เป็นโครงการที่สามารถจัดโครงการได้จริงและมีความก้าวหน้าของโครงการได้อย่างดี
                     
                </span>
                <br/>
                <br/>
                <br/>
                <span className='topic2'>
               ทีมปันใจ
                </span>
                <div class="grid-container1">

                <div className='pic-text'>
                <img
                        className="pic1"
                        src="/forth.jpg"
                    />
                    
                <span className='text2'>
                โฟท
                     
                </span>
                </div>

                <div className='pic-text'>
                <img
                        className="pic1"
                        src="/roong.jpg"
                    />
                <span className='text2'>
                รุ่ง
                     
                </span>
                </div>

                <div className='pic-text'>
                <img
                        className="pic1"
                        src="/june3.jpg"
                    />
                <span className='text2'>
                จูน
                     
                </span>
                </div>

                <div className='pic-text'>
                <img
                        className="pic1"
                        src="/tawan.jpg"
                    />
                <span className='text2'>
               ตะวัน
                     
                </span>
                </div>

                <div className='pic-text'>
                <img
                        className="pic1"
                        src="/dew.jpg"
                    />
                <span className='text2'>
                ดิว
                     
                </span>
                </div>
                
                </div>
                <br/>
                <br/>
                <br/>
                <span className='topic3'>
               ติดต่อเรา
                </span>
               
                <span className='text3'>

                <i class="fas fa-map-marker-alt"> </i>
                 129 ซ.สุขสวัสดิ์ 26 แยก 10-5 แขวงบางปะกอก เขตราษฎร์บูรณะ กทม. 10140
                 <br/>
                 
                <span className='call'>
                 <i class="fas fa-phone-alt"></i> 
                 098-9847077         
                 </span>
                 <span className='email'>
                 <i class="fas fa-envelope"></i>
                 suangruthai.june@mail.kmutt.ac.th
                 </span>
                 <br/>
                 
                 {/* <div className='facebook' href="https://www.facebook.com/suangruthai.titipattananone/">
                    <i class="fab fa-facebook" ></i>Suangruthai Titipattananone
                 </div> */}

                 <div className='facebook'>
                 <Link to="https://www.facebook.com/suangruthai.titipattananone/" className="facebook1" ><i className="fab fa-facebook"></i>Suangruthai Titipattananone  </Link>
                 </div>

                </span>
                </div>
                
                </div>
                 
        )
    }
}
export default aboutus