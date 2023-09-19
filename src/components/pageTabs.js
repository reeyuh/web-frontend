"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Link } from "next/link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export const PageTabs = ({ tabs }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (event, newValue) => {
    router.push(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={pathname} onChange={handleChange} aria-label="common tabs">
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
