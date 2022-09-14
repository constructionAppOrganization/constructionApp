import React from "react";
import { Paper, Card, Typography, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fdfdff",
  },
  pageHeader: {
    padding: theme.spacing(1),
    padding: theme.spacing(2, 10, 2, 0),
    display: "flex",
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(0.7, 0.5, 0, 0),
    borderColor: "black",
    color: "#D4E6F1",
    backgroundColor: "#34495E",
  },
  pageIcon: {
    display: "inline-block",
    padding: theme.spacing(2, 2, 2, 2),
    marginLeft: theme.spacing(3),
    color: "#424242",
    //3c44b1
  },

  pageTitle: {
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(0),
    "& .MuiTypography-subtitle2": {
      opacity: "0.6",
    },
  },
}));

export default function PageHeader(props) {
  const classes = useStyles();
  const { title, subTitle, icon } = props;
  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>{icon}</Card>
        <div className={classes.pageTitle}>
          <Typography variant="h4" component="div">
            {title}
          </Typography>
          <Typography variant="h5" component="div" color="textPrimary">
            <br />
            {subTitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}
