import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DisplayClients from "./DisplayClients";
import AddClient from "./AddClient";
import EditClient from "./EditClient";
import React, { useState } from "react";

function ClientManager() {
  const [editingClient, setEditingClient] = useState("");

  function editClientHandler(CliID) {
    setEditingClient(CliID);
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route
            path="/adminPannel/ClientManager"
            exact
            component={(DisplayClients)}
          >
            <DisplayClients editClientHandler={editClientHandler} />
          </Route>

          <Route path="/adminPannel/ClientManager/AddClient">
            <AddClient />
          </Route>

          <Route path="/adminPannel/ClientManager/EditClient">
            <EditClient id={editingClient} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default ClientManager;
