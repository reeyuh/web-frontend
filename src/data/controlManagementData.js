export const CONTROL_COLUMNS = [
  {
    key: "id",
    label: "User Id",
    hide: true,
  },
  {
    key: "filename",
    label: "Filename",
    type: "text",
    bodyClass: "table-max-250 text-break",
  },
  {
    key: "sensitivity_type",
    label: "Sensitivity Type",
    type: "text",
  },
  {
    label: "Access",
    type: "renderer",
    componentName: "Access",
    componentProps: {},
  },
  {
    key: "encryption_status",
    label: "Encryption Status",
    type: "text",
  },
  {
    key: "location",
    label: "Location",
    type: "text",
    bodyClass: "table-max-250 text-break",
  },
  {
    key: "control_status",
    label: "Security Policy",
    type: "text",
  },
];
