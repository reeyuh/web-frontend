"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_MENU_LIST } from "@/data/SidebarData";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import "@/styles/sidebar.scss";

export const Sidebar = () => {
  const [isOpen, setItOpen] = useState(false);
  const pathname = usePathname();

  const toggleDrawer = (value) => {
    setItOpen(() => value);
  };

  const MenuList = ({ isMobile }) => (
    <>
      <div className="ps-md-3 ps-1 d-flex align-items-center sidebar-logo">
        <div onClick={() => toggleDrawer(!isOpen)}>
          {!isOpen && (
            <MenuIcon className="sidebar-mobile-icon me-md-3 m-1 d-lg-none" />
          )}
          {isOpen && (
            <CloseIcon className="sidebar-mobile-icon me-md-3 m-1 d-lg-none" />
          )}
        </div>
        <Image src={Logo} alt="Logo" height={40} />
        <h1 className="logo-text">TrueNil</h1>
      </div>
      <div
        className={`sidebar-menu flex-fill d-lg-block ${
          isMobile ? "d-block" : ""
        }`}
      >
        {SIDEBAR_MENU_LIST?.map((option, index) => {
          return (
            <Link
              key={index}
              href={option.route}
              className={`d-flex py-3 pe-2 ps-3 text-decoration-none align-items-center sidebar-list ${
                option.route === pathname ? "active" : ""
              }`}
            >
              <option.icon />
              {option.route && (
                <span className="ps-2 sidebar-link">{option.label}</span>
              )}
            </Link>
          );
        })}
      </div>
    </>
  );

  return (
    <div className={`sidebar d-flex flex-column`}>
      <MenuList />
      <Drawer anchor={"left"} open={isOpen} onClose={() => toggleDrawer(false)}>
        <MenuList isMobile />
      </Drawer>
    </div>
  );
};
