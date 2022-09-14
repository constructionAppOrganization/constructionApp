import React from "react";
// import SignUp from "./component/UserManager/SignUp";
// import Login from "./component/UserManager/Login";
// import RegisteredUsers from "./component/UserManager/RegisteredUsers";
import AdminPannel from "./component/AdminPannel/AdminPannel";
import Header from "./component/Header/Header";
import Emp from "./component/Emp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/adminPannel" exact component={AdminPannel}>
            <AdminPannel />
          </Route>
        </Switch>

        <Switch>
          <Route path="/emp" component={Emp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
