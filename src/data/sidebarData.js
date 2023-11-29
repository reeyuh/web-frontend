import PeopleIcon from "@mui/icons-material/People";
import TimerIcon from "@mui/icons-material/Timer";
import PolicyIcon from "@mui/icons-material/Policy";
import SecurityIcon from "@mui/icons-material/Security";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const SIDEBAR_MENU_LIST = [
  {
    label: "Dashboard",
    route: "/dashboard",
    icon: DashboardIcon,
    key: "dashboard",
    hiddenKey: "dashboard",
  },
  {
    label: "Agent status",
    route: "/agent-status",
    icon: TimerIcon,
    key: "agent-status",
    hiddenKey: "list-status",
  },
  {
    label: "User",
    route: "/users",
    routeGroups: ["/users/create"],
    icon: PeopleIcon,
    key: "user",
    hiddenKey: "list-user",
  },
  {
    label: "Organization",
    route: "/organization",
    routeGroups: ["/organization/create"],
    icon: CorporateFareIcon,
    key: "organization",
    hiddenKey: "list-organization",
  },
  {
    label: "Security Dashboard",
    route: "/security-dashboard",
    icon: SecurityIcon,
    key: "security-dashboard",
    hiddenKey: "list-security-dashboard",
  },
  {
    label: "Control Management",
    route: "/control-management",
    icon: PolicyIcon,
    key: "control-management",
    hiddenKey: "list-control-management",
  },
  {
    label: "Audit Trail",
    route: "/audit-trail",
    icon: WorkHistoryIcon,
    key: "audit-trail",
    hiddenKey: "list-audit-trail",
  },
];
