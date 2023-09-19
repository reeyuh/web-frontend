"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Link } from 'next/link';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabbedContent({ tabs, children }) {
  const [value, setValue] = useState(window.location.pathname);
  const router = useRouter();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    router.push(value);
  }, [value, router]);

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="common tabs">
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
      {children}
    </Box>
  );
}

export default TabbedContent;
