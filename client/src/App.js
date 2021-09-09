import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Room from "./containers/Room";
import Wallets from "./components/wallets";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/room" component={Room} />
        {/* <Route path="/" component={() => <Redirect to="/room" />} /> */}
        <Route path="/wallets" component={Wallets} />
      </Switch>
    </Router>
  );
}

export default App;
