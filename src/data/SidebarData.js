import PeopleIcon from "@mui/icons-material/People";
import TimerIcon from "@mui/icons-material/Timer";
import PolicyIcon from "@mui/icons-material/Policy";
import SecurityIcon from "@mui/icons-material/Security";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

export const SIDEBAR_MENU_LIST = [
  {
    label: "Agent status",
    route: "/agent-status",
    icon: TimerIcon,
    key: "agent-status",
    hiddenKey: "view-status",
  },
  {
    label: "User",
    route: "/users",
    routeGroups: ["/users/create"],
    icon: PeopleIcon,
    key: "user",
    hiddenKey: "view-user",
  },
  {
    label: "Security Dashboard",
    route: "/security-dashboard",
    icon: SecurityIcon,
    key: "security-dashboard",
    hiddenKey: "view-security-dashboard",
  },
  {
    label: "Policy Management",
    route: "/policy-management",
    icon: PolicyIcon,
    key: "policy-management",
    hiddenKey: "view-policy-management",
  },
  {
    label: "Audit Trail",
    route: "/audit-trai",
    icon: WorkHistoryIcon,
    key: "audit-trail",
    hiddenKey: "view-audit-trail",
  },
];
