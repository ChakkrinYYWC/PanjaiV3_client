import React, { Component, useEffect, useState } from "react";
import "./tutorial.css";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

class tutorial extends Component {
  render() {
    return (

      
      <div className="bg-tutorial">
        <div className="bg-tutorial1">
        
          
        <div className="topic-tutorial">
            <p>วิธีใช้เว็บบริจาคปันใจ</p>
          </div>

          <center>
                                <div className="btcate">

                                    <ButtonGroup variant="text" aria-label="text primary button group">
                                        <Button href="#tutorial-1"><u>บริจาคเงินให้กับมูลนิธิ</u></Button>
                                        <Button href="#tutorial-2"><u>บริจาคสิ่งของและเงินให้กับมูลนิธิ</u></Button>
                                        <Button href="#tutorial-3"><u>เติมเงินเพื่อบริจาค</u></Button>
                                        <Button href="#tutorial-4"><u>บริจาคสิ่งของและรับของบริจาคผ่านตู้ปันใจ</u></Button>
                                        
                                    </ButtonGroup>
                                </div>

                            </center>
                            <br/>
          
          <div className="topic-tutorial-1" id="tutorial-1">
            <p>1. วิธีการบริจาคเงินให้กับมูลนิธิต่าง ๆ </p>
          </div>
          <div class="grid-container-tutorial">
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial-1.png" />
              <p>1.กดบริจาคเงิน</p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial-2.png" />
              <p>2. เลือกหมวดหมู่ที่ต้องการบริจาค</p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial-3.png" />
              <p>3. เลือกมูลนิธิที่ต้องการบริจาค</p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial-4.png" />
              <p>
                4.รายละเอียดของมูลนิธิ <br />
                และมีแผนที่ดูที่ตั้งของมูลนิธิ{" "}
              </p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial-5.png" />
              <p>5. กดปุ่มบริจาค เพื่อบริจาคเงิน</p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial-6.png" />
              <p>6. เลือกจำนวนเหรียญที่ต้องการบริจาค</p>
            </div>
            
          </div>

          {/* บริจาคสิ่งของมูลนิธิ */}
          <div className="topic-tutorial-1" id="tutorial-2">
            <p>2. วิธีการบริจาคสิ่งของและเงินให้กับมูลนิธิต่าง ๆ </p>
          </div>
          <div class="grid-container-tutorial">
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial1-1.png" />
              <p>1.กดบริจาคสิ่งของ</p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial1-2.png" />
              <p>2. เลือกหมวดหมู่ที่ต้องการบริจาค</p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial1-3.png" />
              <p>3. เลือกมูลนิธิที่ต้องการบริจาค</p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial-4.png" />
              <p>
                4.รายละเอียดของมูลนิธิ <br />
                และมีแผนที่ดูที่ตั้งของมูลนิธิ{" "}
              </p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial1-4.png" />
              <p>5. กดปุ่มบริจาค เพื่อบริจาคเงิน</p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial1-6.png" />
              <p>6. เลือกจำนวนเหรียญที่ต้องการบริจาค</p>
            </div>
            </div>
{/* เติมเงิน */}
            <div className="topic-tutorial-1" id="tutorial-3">
            <p>3. วิธีการเติมเงินเพื่อบริจาค </p>
          </div>
          <div class="grid-container-tutorial">
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial2-1.png" />
              <p>1. ไปที่หน้าข้อมูลส่วนตัว และกดเติมเหรียญ</p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial2-2.png" />
              <p>2. กดเลือกจำนวนเหรียญที่ต้องการเติม</p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial2-3.png" />
              <p>3. ใส่เลขบัตรเดบิตหรือเครดิตเพื่อเติมเงิน</p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial2-4.png" />
              <p>
                4.สามารถดูได้ว่ายอดเงินคงเหลือเท่าไหร่
              </p>
            </div>
            
        </div>
         {/* ตู้ปันใจ */}
         <div className="topic-tutorial-1" id="tutorial-4">
            <p>4. วิธีการบริจาคสิ่งของและรับของบริจาคผ่านตู้ปันใจ </p>
          </div>
          <div class="grid-container-tutorial">
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial3-1.png" />
              <p>1.กดหน้าตู้ปันใจ <br />
              และสามารถโพสต์สิ่งของที่ต้องการบริจาค</p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial3-2.png" />
              <p>2. เลือกดูสิ่งของที่บริจาค<br />
                สามารถกดถูกใจและขอรับของได้<br />
                สามารถกดแก้ไขและลบโพสต์ที่เจ้าของโพสต์เอง
              </p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial3-3.png" />
              <p>3. สามารถดูตรงแจ้งเตือนว่ามีคนมาขอรับของ<br />
                หรือเจ้าของโพสต์ที่เราขอรับของไปอนุญาติมาหรือยัง
              </p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial3-4.png" />
              <p>
                4.สามารถกดรายงานโพสต์ที่ไม่เหมาะสมได้
              </p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial3-7.png" />
              <p>5. เมื่อต้องการดูว่าโพสต์ที่ถูกใจอยู่ตรงไหน<br />
                ให้กดไปที่หน้าข้อมูลส่วนตัว<br />
                และปุ่มกดโพสต์ที่ถูกใจ
              </p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial3-6.png" />
              <p>6. จะแสดงโพสต์ที่เราเคยกดถูกใจไว้ </p>
            </div>
            </div>
      </div>
      </div>
    );
  }
}
export default tutorial;
