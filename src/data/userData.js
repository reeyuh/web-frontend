import EditTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import { FIRST_NAME, LAST_NAME } from "./commonData";

export const USER_COLUMNS = [
  {
    key: "id",
    label: "User Id",
    hide: true,
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "roleAlias",
    label: "Role",
  },
  {
    key: "created_at",
    label: "Creation Date",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "actions",
    label: "Actions",
    type: "actions",
    headClass: "text-center",
    bodyClass: "text-center",
    actions: [
      {
        type: "edit",
        actionClass: "table-edit-action m-1",
        icon: EditTwoToneIcon,
        clickFnName: "editUser",
      },
    ],
  },
];

export const USER_INPUTS = {
  cardClass: "common-card mt-0 border-0",
  contentClass: "p-0",
  formGroup: "mb-md-3 mb-0",
  groups: [
    {
      name: "",
      fields: [
        { ...FIRST_NAME, xs: 12, sm: 12, md: 12, lg: 12, xl: 12 },
        { ...LAST_NAME, xs: 12, sm: 12, md: 12, lg: 12, xl: 12 },
        {
          label: "Role",
          name: "role",
          placeholder: "Role",

          formControlClass: "mt-4 pt-0",
          fieldClass: "w-100",
          type: "select",
          isRequired: true,
          errors: [{ type: "required", message: "Please choose role" }],
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12,
        },
      ],
      btnList: [{ text: "Update" }],
    },
  ],
};

export const SUPER_ADMIN_KEY = "superadmin";
export const ADMIN_KEY = "admin";
export const ROLE_ALIAS = {
  [ADMIN_KEY]: "Admin",
  operator: "Operator",
  researcher: "Researcher",
  [SUPER_ADMIN_KEY]: "Super Admin",
};

export const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "Operator", value: "operator" },
  { label: "Researcher", value: "researcher" },
];
