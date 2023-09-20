"use client";

import React from "react";
import Box from "@mui/material/Box";
import { useRouter, usePathname } from "next/navigation";
import { Link } from "next/link";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import styled from "@emotion/styled";
import { colors } from "@/utils/theme";

export const TabStyled = styled(Tab)`
  color: inherit;
  padding: 12px 0px;
  align-items: flex-start;
  text-transform: inherit;
  font-size: 16px;
  margin-right: 16px;
  min-width: auto;

  &.Mui-selected {
    color: ${colors.primaryBg};
  }
`;

export const TabsStyled = styled(Tabs)`
  .MuiTabs-indicator {
    background-color: ${colors.primaryBg};
    height: 3px;
  }
`;

export const PageTabs = ({ tabs }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (event, newValue) => {
    router.push(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} className="mt-2 mb-3">
      <TabsStyled
        value={pathname}
        onChange={handleChange}
        aria-label="common tabs"
        className="common-tabs"
      >
        {tabs.map((tab, index) => (
          <TabStyled
            key={index}
            label={tab.label}
            value={tab.link}
            component={Link}
            to={tab.link}
          />
        ))}
      </TabsStyled>
    </Box>
  );
};
