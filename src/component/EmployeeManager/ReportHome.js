import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import React, { useState } from "react";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import PageHeader from "./PageHeader";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import { Grid } from "@material-ui/core";
import Tooltip from "@mui/material/Tooltip";
import image2 from "./image/r.jpg";
import pie from "./image/pie.jpg";
import bar from "./image/bar.jpg";
import rep from "./image/rep.png";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const mainStyle = "#FDFDFD";

export default function EmpHome() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div style={{ backgroundColor: mainStyle, minHeight: "650px" }}>
      <PageHeader
        title="Report Dashboard"
        //subTitle="Form design with validation"
        icon={<SpeakerNotesIcon fontSize="large" />}
      />

      <div
        style={{
          backgroundColor: mainStyle,
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "#ABB2B9",
          paddingBottom: "50px",
          height: "490px",
          // marginBottom: "0px",
        }}
      >
        <Grid container>
          <Grid item xs={6}>
            <Link to="/adminPannel/EmployeeManager/BarChart">
              <Tooltip
                title={"Generate designation against contract report"}
                placement={"right"}
              >
                <Button
                  style={{
                    borderRadius: 8,
                    backgroundColor: "#065F5F",
                    height: "75px",
                    width: "320px",
                    margin: "130px 0px 10px 180px",
                    color: "#ffffff",
                    fontSize: "25px",
                  }}
                  variant="contained"
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    Designation report
                    <Avatar
                      style={{
                        borderRadius: 8,
                        width: "20%",
                        height: "20%",
                        margin: "0px 0px 0px 27px",
                      }}
                      src={bar}
                    />
                  </div>
                </Button>
              </Tooltip>
            </Link>

            <Link to="/adminPannel/EmployeeManager/PieChart">
              <Tooltip
                title={"Generate employee designation report"}
                placement={"right"}
              >
                <Button
                  style={{
                    borderRadius: 8,
                    backgroundColor: "#2471A3",
                    height: "75px",
                    width: "320px",
                    margin: "10px 0px 30px 180px",
                    color: "#ffffff",
                    fontSize: "25px",
                  }}
                  variant="contained"
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    Contract report
                    <Avatar
                      style={{
                        borderRadius: 5,
                        width: "20%",
                        height: "20%",
                        margin: "0px 0px 0px 65px",
                      }}
                      src={pie}
                    />
                  </div>
                </Button>
              </Tooltip>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Avatar
              style={{
                borderRadius: 15,
                width: "55%",
                height: "75%",
                margin: "80px 0px 0px 100px",
              }}
              src={rep}
            />
          </Grid>
        </Grid>
      </div>

      <br />
      <br />
    </div>
  );
}
