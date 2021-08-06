import React from "react";
import Sidenav  from "../Components/Admin/Sidenav";
import { Menu } from "../Components/Admin/Menu";
import "./Layout_admin.css"

const Layout_admin = (props) => {
  return (
    <div className="sb-nav-fixed">
      <Menu />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidenav />
        </div>
        <div id="layoutSidenav_content">
          <main>{props.children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout_admin;
