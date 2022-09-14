import React, { useState, useEffect } from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import PageHeader from "./PageHeader";
import PersonIcon from "@material-ui/icons/Person";
import firebase from "firebase";

function BarChart(props) {
  //variable declaration
  const [designation, setDesignation] = useState([]);
  const [designationCountArr, setDesignationCountArr] = useState([]);

  //Database Connections
  const db = firebase.firestore(firebase);

  useEffect(() => {
    async function getData() {
      const designationArray = [];
      const employeeArray = [];

      let countArr = [];

      await db.collection("Designation").onSnapshot(async (snapshot) => {
        await snapshot.docs.forEach((element) => {
          designationArray.push(element.data().designation); //push in array
        });
        db.collection("employees").onSnapshot(async (snapshot2) => {
          //getting employee
          await snapshot2.docs.forEach((element) => {
            employeeArray.push(element.data());
          });

          setDesignation(designationArray);

          designationArray.forEach((des) => {
            let count = 0;

            employeeArray.forEach((emp) => {
              if (emp.designation == des) {
                count++;
              }
            });
            countArr.push(count);
          });
          setDesignationCountArr(countArr);
          console.log("designation count", designationCountArr);
        });
      });
    }
    getData();
  }, []);

  return (
    <>
      <PageHeader
        title="Report"
        subTitle="Designation based report"
        icon={<PersonIcon fontSize="large" />}
      />

      <div
        style={{
          paddingTop: "40px",
          paddingBottom: "10px",
          marginBottom: "10px",
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "#ABB2B9",
        }}
      >
        <Doughnut
          data={{
            labels: designation,
            datasets: [
              {
                label: "Contract Employees",
                data: designationCountArr,
                backgroundColor: [
                  "rgba(231, 76, 60, 0.8)",
                  "rgba(46, 204, 113, 0.8)",
                  "rgba(142, 68, 173, 0.8)",
                  "rgba(41, 128, 185, 0.8)",
                  "rgba(241, 196, 15 , 0.8)",
                ],

                borderColor: "rgba(247, 249, 249, 1)",
                borderWidth: 3,
              },
            ],
          }}
          height={100}
          options={{}}
        />
      </div>
    </>
  );
}

export default BarChart;
