import React, { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { logoutUser } from "../actions.js";
import Searchbar from "./Searchbar.js";

const Nav = (props) => {
  const {
    user,
    user: { loggedIn },
    location: { pathname },
  } = props;

  const logOut = () => {
    logoutUser();
    localStorage.clear();
  };

  return (
    <Menu>
      {loggedIn ? (
        <Fragment>
          <h1 className="Header-title">P U B L I U S . </h1>

          <Menu.Menu position="left">
            <Menu.Item
              as={NavLink}
              to="/"
              name="Home"
              active={pathname === "/"}
              icon="home"
            />
            <Menu.Item
              as={NavLink}
              to="/profile"
              name="Saved Articles"
              active={pathname === "/profile"}
            />
          </Menu.Menu>

          <Menu.Item position="left">
            <Searchbar />
          </Menu.Item>
          <Menu.Item
            name={
              user.user.name + "," + user.user.age + "," + user.user.country
            }
            className="profile-header"
          />
          <Menu.Item
            as={NavLink}
            to="/"
            name="Logout"
            onClick={() => logOut()}
            active={pathname === "/logout"}
            icon="sign-out"
          />
        </Fragment>
      ) : (
        <Fragment>
          <h1 className="Header-title">P U B L I U S . </h1>
          <Menu.Item
            position="left"
            as={NavLink}
            to="/"
            name="Home"
            active={pathname === "/"}
            icon="home"
          />
          <Menu.Item position="left">
            <Searchbar />
          </Menu.Item>
          <Menu.Item
            position="right"
            as={NavLink}
            to="/login"
            name="Login"
            active={pathname === "/login"}
            icon="sign-in"
          />
          <Menu.Item
            as={NavLink}
            to="/signup"
            name="Sign Up"
            active={pathname === "/signup"}
            icon="edit outline"
          />
        </Fragment>
      )}
    </Menu>
  );
};

const mapStateToProps = ({ user }) => ({ user });

export default withRouter(connect(mapStateToProps, { logoutUser })(Nav));
