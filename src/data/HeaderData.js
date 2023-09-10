import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export const HEADER = [
  {
    icon: AccountCircleIcon,
    route: "/profile",
    key: "profile",
    label: "Edit Profile",
  },
  {
    icon: ExitToAppIcon,
    route: null,
    key: "logout",
    label: "Logout",
  },
];
