import React, { Component, useEffect, useState } from "react";
import "./tutorial.css";

class tutorial extends Component {
  render() {
    return (
      <div className="bg-tutorial">
        <div className="bg-tutorial1">
        <div className="topic-tutorial">
            <p>วิธีใช้เว็บบริจาคปันใจ</p>
          </div>
          
          <div className="topic-tutorial-1">
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
            {/* <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial-7.png" />
              <p>7.เมื่อเหรียญไม่พอ จะไม่สามารถบริจาคได้</p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial-8.png" />
              <p>
                8. เติมเหรียญเข้าสู่เว็บปันใจ <br />{" "}
                เลือกจำนวนเหรียญที่ต้องการเติมเงิน
              </p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial-9.png" />
              <p>
                9. ผูกบัตรเครดิตหรือเดบิต <br />
                เพื่อเติมเงินเข้าสู่เว็บปันใจ
              </p>
            </div> */}
          </div>

          {/* บริจาคสิ่งของมูลนิธิ */}
          <div className="topic-tutorial-1">
            <p>2. วิธีการบริจาคสิ่งของและเงินให้กับม฿ลนิธิต่าง ๆ </p>
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
              <img className="pic-tutorial" src="/tutorial1-4.png" />
              <p>
                4.รายละเอียดของมูลนิธิ <br />
                และมีแผนที่ดูที่ตั้งของมูลนิธิ{" "}
              </p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial1-5.png" />
              <p>5. กดปุ่มบริจาค เพื่อบริจาคเงิน</p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial1-6.png" />
              <p>6. เลือกจำนวนเหรียญที่ต้องการบริจาค</p>
            </div>
            </div>
{/* ตู้ปันใจ */}
            <div className="topic-tutorial-1">
            <p>2. วิธีการบริจาคสิ่งของและเงินให้กับม฿ลนิธิต่าง ๆ </p>
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
              <img className="pic-tutorial" src="/tutorial1-4.png" />
              <p>
                4.รายละเอียดของมูลนิธิ <br />
                และมีแผนที่ดูที่ตั้งของมูลนิธิ{" "}
              </p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial1-5.png" />
              <p>5. กดปุ่มบริจาค เพื่อบริจาคเงิน</p>
            </div>
            <div class="grid-item-tutorial">
              <img className="pic-tutorial" src="/tutorial1-6.png" />
              <p>6. เลือกจำนวนเหรียญที่ต้องการบริจาค</p>
            </div>
        </div>
      </div>
      </div>
    );
  }
}
export default tutorial;
