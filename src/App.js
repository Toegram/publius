import React, { Fragment } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import LogInForm from "./components/LogInForm.js";
import SignUp from "./components/SignUp.js";
import Profile from "./components/Profile.js";
import Nav from "./components/Nav.js";
import NotFound from "./components/NotFound.js";
import NewsSidebar from "./components/NewsSidebar.js";
import "./App.css";

//makes a copy of state, moves first element of array to last spot and returns new elem [0]
// displayStory = () => {
//   const stateStories = this.state.newsStories
//   let rollingStories = stateStories.push(stateStories.shift())
//   return rollingStories[0] //why is this returning '1'?
// }

const App = (props) => {
  return (
    <Fragment>
      <Nav />
      <Switch>
        <Route exact path="/login" component={LogInForm} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/" component={NewsSidebar} />
        <Route exact path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default withRouter(App);
