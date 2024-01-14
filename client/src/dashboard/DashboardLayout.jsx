import React from "react";
import { Outlet } from "react-router-dom";

import SideBar from "./SideBar";

const DashboardLayout = () => {
  return (
    <div className="flex w-full flex-col relative md:flex-row justify-end">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
