"use client";

import { useState, useEffect } from "react";
import "@/styles/header.scss";
import { getInitials, getLocalStore } from "@/utils/commonFn";

export const Header = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const name = getLocalStore("display_name");
    const initials = getInitials(name);
    setProfile({ name, initials });
  }, []);

  return (
    <div className="header d-flex px-md-4 justify-content-between align-items-center flex-row-reverse">
      <div className="header-right flex-column text-center">
        {profile.initials && (
          <p className="header-icon mb-0 rounded-circle">{profile.initials}</p>
        )}
        {profile.name && <p className="header-text m-0 mt-1">{profile.name}</p>}
      </div>
    </div>
  );
};
