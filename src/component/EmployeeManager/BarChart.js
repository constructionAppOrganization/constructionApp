import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import PageHeader from "./PageHeader";
import PersonIcon from "@material-ui/icons/Person";
import firebase from "firebase";

function BarChart(props) {
  //variable declaration
  const [designation, setDesignation] = useState([]);
  const [contract, setContact] = useState([]);
  const [nonContract, setNonContract] = useState([]);
  const [anyContract, setAnyContract] = useState([]);

  //Database Connections
  const db = firebase.firestore(firebase);

  useEffect(() => {
    async function getData() {
      const designationArray = [];
      const employeeArray = [];

      let contractedCountArr = [];
      let nonContractedCountArr = [];
      let allContractCountArr = [];

      await db.collection("Designation").onSnapshot(async (snapshot) => {
        await snapshot.docs.forEach((element) => {
          designationArray.push(element.data().designation); //push in aaray
        });
        db.collection("employees").onSnapshot(async (snapshot2) => {
          //getting employee
          await snapshot2.docs.forEach((element) => {
            employeeArray.push(element.data());
          });

          setDesignation(designationArray);

          designationArray.forEach((des) => {
            let contractedCount = 0;
            let nonContractedCount = 0;

            employeeArray.forEach((emp) => {
              if (emp.designation == des && emp.empType == "contracted") {
                contractedCount++;
              } else if (
                emp.designation == des &&
                emp.empType == "non-contracted"
              ) {
                nonContractedCount++;
              }
            });

            contractedCountArr.push(contractedCount);
            nonContractedCountArr.push(nonContractedCount);
          });

          allContractCountArr = contractedCountArr.map(
            (a, i) => a + nonContractedCountArr[i]
          );

          setContact(contractedCountArr);
          setNonContract(nonContractedCountArr);
          setAnyContract(allContractCountArr);
        });
      });
    }
    getData();
  }, []);

  return (
    <>
      <PageHeader
        title="Report"
        subTitle="Contract based report"
        icon={<PersonIcon fontSize="large" />}
      />
      <div
        style={{
          paddingTop: "40px",
          paddingBottom: "20px",
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "#ABB2B9",
        }}
      >
        <Bar
          data={{
            labels: designation,
            datasets: [
              {
                label: "Contract Employees",
                data: contract,
                backgroundColor: "rgba(255, 99, 132, 0.4)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
              {
                label: "Non-contract employees",
                data: nonContract,
                backgroundColor: "rgba(100, 162, 235, 0.4)",
                borderColor: "rgba(100, 162, 235, 1)",
                borderWidth: 1,
              },
              {
                label: "All employees",
                data: anyContract,
                backgroundColor: "rgba(247, 233, 70, 0.4)",
                borderColor: "rgba(247, 233, 70, 1)",
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </>
  );
}

export default BarChart;
