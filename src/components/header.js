"use client";

import { useState, useEffect } from "react";
import "@/styles/header.scss";
import { getInitials, getLocalStore } from "@/utils/commonFn";
import Popover from "@mui/material/Popover";
import { deleteCookie } from "@/utils/cookiesHandler";
import { useRouter } from "next/navigation";

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
    //localStorage.clear();
    await deleteCookie("_id");
    router.push("/sign-in");
  };

  return (
    <div className="header d-flex px-md-4 justify-content-between align-items-center flex-row-reverse">
      <div
        className="header-right flex-column text-center"
        onMouseEnter={handlePopoverOpen}
      >
        {profile.initials && (
          <p className="header-icon mb-1 rounded-circle">{profile.initials}</p>
        )}
        {profile.name && (
          <p className="header-text m-0 mt-1 pb-1">{profile.name}</p>
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
          <li className="py-2 px-4">
            <a href="/logout" className="header-dropdown-item">
              Logout
            </a>
          </li>
        </ul>
      </Popover>
    </div>
  );
};
