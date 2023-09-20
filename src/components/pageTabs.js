"use client";

import React from "react";
import Box from "@mui/material/Box";
import { useRouter, usePathname } from "next/navigation";
import { Link } from "next/link";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

export const PageTabs = ({ tabs }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (event, newValue) => {
    router.push(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={pathname}
        onChange={handleChange}
        aria-label="common tabs"
        className="common-tabs"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            value={tab.link}
            component={Link}
            to={tab.link}
          />
        ))}
      </Tabs>
    </Box>
  );
};
