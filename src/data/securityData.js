export const SECURITY_COLUMNS = [
  {
    key: "id",
    label: "User Id",
    hide: true,
  },
  {
    key: "filename",
    label: "Data",
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
    key: "security_status",
    label: "Security Status",
    type: "text",
  },
];
