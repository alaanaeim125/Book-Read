import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen/Index";
import SearchScreen from "./Screens/SearchScreen/Index";

class BooksApp extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomeScreen />
            </Route>

            <Route exact path="/search">
              <SearchScreen />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
