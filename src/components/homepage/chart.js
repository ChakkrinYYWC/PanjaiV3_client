import React from "react";
import { Line } from "react-chartjs-2";
import { Select, Tab, Tabs } from "@material-ui/core";
import Axios from "axios";

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const dashboardDATA = {
  ยอดเงินบริจาคทั้งหมด: [],
  จำนวนครั้งที่ได้รับการบริจาคผ่านตู้ปันใจ: [],
  จำนวนผู้ใช้งานเว็บปันใจ: [],
};

async function getNumberData() {
  await Axios.post("/authenticate/getdashboard/donation", {})
    .then(async (res) => {
      //console.log(res.data)
      dashboardDATA.ยอดเงินบริจาคทั้งหมด = [res.data[0], res.data[1], res.data[2], res.data[3], res.data[4], res.data[5], res.data[6], res.data[7], res.data[8], res.data[9], res.data[10], res.data[11],]
      //console.log("ยอดเงินบริจาคทั้งหมด" + dashboardDATA.ยอดเงินบริจาคทั้งหมด)
    })
    .catch((error) => console.log(error));

  await Axios.post("/authenticate/getdashboard/numberOfDonation", {})
    .then(async (res) => {
      //console.log(res.data)
      dashboardDATA.จำนวนครั้งที่ได้รับการบริจาคผ่านตู้ปันใจ = [res.data[0], res.data[1], res.data[2], res.data[3], res.data[4], res.data[5], res.data[6], res.data[7], res.data[8], res.data[9], res.data[10], res.data[11],]
      //console.log("จำนวนครั้งที่ได้รับการบริจาคผ่านตู้ปันใจ" + dashboardDATA.จำนวนครั้งที่ได้รับการบริจาคผ่านตู้ปันใจ)
    })
    .catch((error) => console.log(error));

  await Axios.post("/authenticate/getdashboard/numberOfUser", {})
    .then(async (res) => {
      //console.log(res.data)
      dashboardDATA.จำนวนผู้ใช้งานเว็บปันใจ = [res.data[0], res.data[1], res.data[2], res.data[3], res.data[4], res.data[5], res.data[6], res.data[7], res.data[8], res.data[9], res.data[10], res.data[11],]
      //console.log("จำนวนผู้ใช้งานเว็บปันใจ" + dashboardDATA.จำนวนผู้ใช้งานเว็บปันใจ)
    })
    .catch((error) => console.log(error));
}
getNumberData()


// export const MockData = {
//   ยอดเงินบริจาคทั้งหมด: [65, 59, 80, 81, 56, 55, 40, 88, 56, 68, 78, 37],
//   จำนวนครั้งที่ได้รับการบริจาคผ่านตู้ปันใจ: [30, 20, 25, 70, 90, 70, 58, 87, 78, 38, 34, 61,],
//   จำนวนผู้ใช้งานเว็บปันใจ: [85, 69, 80, 41, 86, 95, 70, 98, 84, 91, 83, 28],
// };


export const Color = {
  ยอดเงินบริจาคทั้งหมด: "rgb(104, 73, 13)",
  จำนวนครั้งที่ได้รับการบริจาคผ่านตู้ปันใจ: "rgb(199, 119, 27)",
  จำนวนผู้ใช้งานเว็บปันใจ: "rgb(92, 53, 8)",
};

export const DonationChart = () => {
  const [tabState, setTabState] = React.useState("data1");
  const handleTabOnChange = (event, value) => {
    setTabState(value);
  };
  const genData = () => ({
    labels: labels,
    datasets: [
      {
        label: tabState,
        data: dashboardDATA[tabState],
        borderColor: Color[tabState],
        tension: 0.2,
      },
    ],
  });

  return (
    <>
      <Tabs
        value={tabState}
        onChange={handleTabOnChange}
        indicatorColor="primary"
        color="primary"
      >
        <Tab label="ยอดเงินบริจาคทั้งหมด" value={"ยอดเงินบริจาคทั้งหมด"} />
        <Tab label="จำนวนครั้งที่ได้รับการบริจาคผ่านตู้ปันใจ" value={"จำนวนครั้งที่ได้รับการบริจาคผ่านตู้ปันใจ"} />
        <Tab label="จำนวนผู้ใช้งานเว็บปันใจ" value={"จำนวนผู้ใช้งานเว็บปันใจ"} />
      </Tabs>
      <Line data={genData()} />
    </>
  );
};
