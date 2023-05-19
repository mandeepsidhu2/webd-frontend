import React from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import PortfolioScreen from "./screens/PortfolioScreen/PortfolioScreen";
import AboutScreen from "./screens/AboutScreen/AboutScreen";
import ContactScreen from "./screens/ContactScreen/ContactScreen";
import DisplayScreen from "./screens/DisplayScreen/DisplayScreen";
import PolicyScreen from "./screens/PolicyScreen/PolicyScreen";
import TermsScreen from "./screens/TermsScreen/TermsScreen";
import SearchScreen from "./screens/SearchScreen/SearchScreen"
import Error404 from "./screens/Error404";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { userToken } from "./features/user/userSlice";

function App() {
  const accessToken = useSelector(userToken);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/home" component={HomeScreen} />
          <Route exact path="/portfolio">
            {accessToken ? <PortfolioScreen /> : <Redirect to="/home" />}
          </Route>
          <Route exact path="/d/:id" component={DisplayScreen} />
          <Route exact path="/about" component={AboutScreen} />
          <Route exact path="/search" component={SearchScreen} />
          <Route exact path="/contact" component={ContactScreen} />
          <Route exact path="/policy" component={PolicyScreen} />
          <Route exact path="/terms" component={TermsScreen} />
          <Route component={Error404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;