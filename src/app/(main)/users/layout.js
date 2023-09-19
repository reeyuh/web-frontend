"use client";

import React from "react";
import { PageTabs } from "@/components";
import { USER_TABS } from "@/data/pageTabsData.js";

const UsersLayout = ({ children }) => {
  return (
    <div>
      <PageTabs tabs={USER_TABS} />
      {children}
    </div>
  );
};

export default UsersLayout;
