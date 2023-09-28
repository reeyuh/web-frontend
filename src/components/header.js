"use client";

import { useState, useEffect } from "react";
import "@/styles/header.scss";
import { getInitials, getLocalStore } from "@/utils/commonFn";
import Popover from "@mui/material/Popover";
import { useRouter } from "next/navigation";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export const Header = () => {
  const router = useRouter();
  const [profile, setProfile] = useState({});
  const [anchorPopOver, setAnchorPopOver] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorPopOver(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorPopOver(null);
  };

  useEffect(() => {
    const name = getLocalStore("display_name");
    const initials = getInitials(name);
    setProfile({ name, initials });
  }, []);

  const onLogout = async () => {
    localStorage.clear();
    router.push("/logout");
  };

  return (
    <div className="header d-flex px-md-4 justify-content-between align-items-center flex-row-reverse">
      <div
        className="header-right flex-column text-center"
        onClick={handlePopoverOpen}
      >
        {profile.initials && (
          <p className="header-icon mb-1 rounded-circle">{profile.initials}</p>
        )}
        {profile.name && (
          <p className="header-text m-0 mt-1 pb-1">
            {profile.name}
            {!anchorPopOver && <ArrowDropDownIcon />}{" "}
            {anchorPopOver && <ArrowDropUpIcon />}
          </p>
        )}
      </div>
      <Popover
        open={Boolean(anchorPopOver)}
        anchorEl={anchorPopOver}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
      >
        <ul
          className="list-unstyled pt-2 pb-2 m-0"
          onMouseLeave={handlePopoverClose}
        >
          <li className="py-2 px-4">
            <a href="/profile" className="header-dropdown-item">
              Update Profile
            </a>
          </li>
          <li className="py-2 px-4 header-dropdown-item" onClick={onLogout}>
            Logout
          </li>
        </ul>
      </Popover>
    </div>
  );
};
