"use client";

import { Sidebar, Header, PageHeader } from "@/components";
import { AllTabs } from "@/components/UI/Tabs";
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4154f1',
    },
    secondary: {
      main: '#f2f4f6',
    },
  },
});

export default function MainLayout(props) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Sidebar />
      <div className="main-layout">
        <PageHeader />
        <AllTabs />
      </div>
    </ThemeProvider>
  );
}
