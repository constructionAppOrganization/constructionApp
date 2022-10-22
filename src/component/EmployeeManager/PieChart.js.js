import React, { useState, useEffect } from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import PageHeader from "./PageHeader";
import PersonIcon from "@material-ui/icons/Person";
import firebase from "firebase";

function BarChart(props) {
  const [designation, setDesignation] = useState([]);
  const [salariesArr, setSalaryArr] = useState([]);

  const [contract, setContact] = useState([]);
  const [nonContract, setNonContract] = useState([]);

  //Database Connections
  const db = firebase.firestore(firebase);

  useEffect(() => {
    async function getData() {
      const designationArray = [];
      const employeeArray = [];

      let salaryArr = [];
      let contractedCountArr = [];
      let nonContractedCountArr = [];

      db.collection("Designation").onSnapshot(async (snapshot) => {
        snapshot.docs.forEach((element) => {
          designationArray.push(element.data().designation); //push in array
        });
        db.collection("employees").onSnapshot(async (snapshot2) => {
          //getting employee
          snapshot2.docs.forEach((element) => {
            employeeArray.push(element.data());
          });

          setDesignation(designationArray);

          designationArray.forEach((des) => {
            let salary = 0;
            let contractedSalary = 0;
            let nonContractedSalary = 0;

            employeeArray.forEach((emp) => {
              if (emp.designation == des) {
                salary += parseInt(emp.etf);

                if (emp.empType == "contracted") {
                  contractedSalary += parseInt(emp.etf);
                } else if (emp.empType == "non-contracted") {
                  nonContractedSalary += parseInt(emp.etf);
                }
              }
            });
            salaryArr.push(salary);
            contractedCountArr.push(contractedSalary);
            nonContractedCountArr.push(nonContractedSalary);
          });

          setSalaryArr(salaryArr);
          setContact(contractedCountArr);
          setNonContract(nonContractedCountArr);
        });
      });
    }
    getData();
  }, []);

  const getSum = (arr) =>
    arr.length > 0 ? arr.reduce((sum, num) => sum + num) : 0;

  return (
    <div className="pieContainer">
      <PageHeader
        title="Report"
        subTitle="ETF report"
        icon={<PersonIcon fontSize="large" />}
      />

      <div
        className="pieBody"
        style={{
          paddingTop: "40px",
          paddingBottom: "20px",
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "#ABB2B9",
        }}
      >
        <div className="pieChart">
          <Doughnut
            data={{
              labels: designation,
              datasets: [
                {
                  label: "Contract Employees",
                  data: salariesArr,
                  backgroundColor: [
                    "rgba(231, 76, 60, 0.8)",
                    "rgba(46, 204, 113, 0.8)",
                    "rgba(142, 68, 173, 0.8)",
                    "rgba(41, 128, 185, 0.8)",
                    "rgba(241, 196, 15 , 0.8)",
                  ],

                  borderColor: "rgba(247, 249, 249, 1)",
                  borderWidth: 4,
                },
              ],
            }}
            height={100}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "",
                },
              },
            }}
          />
        </div>

        <div className="pieOtherInfoMain">
          <div className="pieOtherInfoData">
            <h5>Total Payout</h5>
            <h5>{getSum(salariesArr)}</h5>
          </div>
          <div className="pieOtherInfoData">
            <h5>Contract</h5>
            <h5>{getSum(contract)}</h5>
          </div>
          <div className="pieOtherInfoData">
            <h5>Non-Contract</h5>
            <h5>{getSum(nonContract)}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BarChart;
