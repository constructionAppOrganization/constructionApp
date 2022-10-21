import React from "react";
// import SignUp from "./component/UserManager/SignUp";
// import Login from "./component/UserManager/Login";
// import RegisteredUsers from "./component/UserManager/RegisteredUsers";
import AdminPannel from "./component/AdminPannel/AdminPannel";
import Header from "./component/Header/Header";
import Emp from "./component/Emp";
import EmployeeManager from "./component/EmployeeManager/EmployeeManager";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./component/Home/Home";
import ClientManager from "./component/ClientManager/ClientManager";

import ProjectManagerHeader from "./component/Header/ProjectManagerheader";
import ProjectManager from "./component/ProjectManagement/ProjectUI";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            path="/adminPannel/ProjectManagement"
            component={ProjectManagerHeader}
          />

          <Route path="/adminPannel" component={Header} />
        </Switch>

        <Switch>
          <Route path="/" exact component={Home}>
            <Home />
          </Route>

          <Route path="/adminPannel" exact component={AdminPannel}>
            <AdminPannel />
          </Route>

          <Route
            path="/adminPannel/ProjectManagement"
            exact
            component={ProjectManager}
          >
            <ProjectManager />
          </Route>

          <Route
            path="/adminPannel/EmployeeManager"
            component={EmployeeManager}
          >
            <EmployeeManager />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;