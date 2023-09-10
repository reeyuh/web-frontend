"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SIDEBAR_MENU_LIST } from "@/data/SidebarData";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import "@/styles/sidebar.scss";

export const Sidebar = () => {
  const MenuList = () => (
    <>
      {SIDEBAR_MENU_LIST?.map((option, index) => {
        return (
          <Link
            key={index}
            href={option.route}
            className="d-flex py-3 pe-2 ps-3 text-decoration-none align-items-center sidebar-list"
          >
            <option.icon />
            {option.route && (
              <span className="ps-2 sidebar-link">{option.label}</span>
            )}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="sidebar d-flex flex-column">
      <div className="ps-3 d-flex align-items-center sidebar-logo">
        <Image src={Logo} alt="Logo" height={40} />
        <h1 className="logo-text">TrueNil</h1>
      </div>
      <div className="sidebar-menu flex-fill">
        <MenuList />
      </div>
    </div>
  );
};
