import React from "react";
import { Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import { Redirect, BrowserRouter as Router } from "react-router-dom";
import { client } from "./Layouts/client";
import Layout_admin from "./Layouts/Layout_admin";
import Manage_users from "./Pages/Manage_users";
import Manage_product from "./Pages/Manage_product";
import { DashBoard } from "./Components/Admin/DashBoard";

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <Component {...props}></Component>
      </Layout>
    )}
  ></Route>
);
const App = () => {
  return (
    <Router>
      <AppRoute path="/" exact layout={client} component={Home} />
      <AppRoute path="/home" exact layout={client} component={Home} />
      <AppRoute path="/about" exact layout={client} component={About} />
      <Route path="/login" exact component={Login} />
      <AppRoute
        path="/admin"
        exact
        layout={Layout_admin}
        component={() => {
          if (
            localStorage.getItem("token") == null &&
            localStorage.getItem("role") == null
          ) {
            return <Redirect to="/" />;
          }
          return <DashBoard />;
        }}
      />
      <AppRoute
        path="/admin/user"
        exact
        layout={Layout_admin}
        component={Manage_users}
      />
      <AppRoute
        path="/admin/product"
        exact
        layout={Layout_admin}
        component={Manage_product}
      />
    </Router>
  );
};

export default App;
