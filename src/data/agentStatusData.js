export const AGENT_COLUMNS = [
  {
    key: "id",
    label: "User Id",
    hide: true,
  },
  {
    key: "name",
    label: "Agent",
    type: "text",
    headClass: "w-25",
  },
  {
    label: "Agent State",
    type: "renderer",
    componentName: "LiveOffline",
    componentProps: {},
    headClass: "w-25 table-min-117",
  },
  {
    label: "Health Status",
    type: "renderer",
    componentName: "HealthStatus",
    componentProps: {},
    headClass: "w-25 table-min-125",
  },
  {
    key: "location",
    label: "Location",
    type: "text",
    headClass: "w-25",
  },
  {
    key: "last_update_time",
    label: "Last Updated At",
    type: "text",
    headClass: "w-25 table-min-145",
  },
];
