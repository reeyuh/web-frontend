import { VALIDATION } from "./commonData";

export const ORG_COLUMNS = [
  {
    key: "id",
    label: "User Id",
    hide: true,
  },
  {
    key: "name",
    label: "Name",
    type: "text",
    bodyClass: "table-max-250 text-break",
  },

  {
    key: "created_at",
    label: "Creation Date",
    type: "text",
  },
];

export const ORG_INPUTS = {
  cardClass: "common-card mt-0 border-0",
  contentClass: "p-0",
  formGroup: "mb-md-3 mb-0",
  groups: [
    {
      name: "",
      fields: [
        {
          label: "Org Name",
          name: "name",
          placeholder: "Organization Name",
          formControlClass: "mt-4 pt-0",
          fieldClass: "w-100",
          type: "text",
          isRequired: true,
          maxLength: 200,
          minLength: 1,
          pattern: VALIDATION.ALPHABET_NUMBER,
          errors: [
            { type: "required", message: "Please enter the organization name" },
            {
              type: "pattern",
              message: "Please enter only alphanumeric value",
            },
          ],
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12,
        },
        {
          label: "Website",
          name: "website",
          placeholder: "Website",
          formControlClass: "mt-4 pt-0",
          fieldClass: "w-100",
          type: "text",
          isRequired: true,
          maxLength: 200,
          minLength: 1,
          pattern: VALIDATION.WEBSITE,
          errors: [
            { type: "required", message: "Please enter the website" },
            {
              type: "pattern",
              message: "Please enter correct website",
            },
          ],
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12,
        },
        {
          label: "Org Details",
          name: "details",
          placeholder: "Organization Details",
          formControlClass: "mt-4 pt-0",
          fieldClass: "w-100",
          type: "textarea",
          isRequired: true,
          maxLength: 250,
          minLength: 1,
          errors: [
            {
              type: "required",
              message: "Please enter the organization details",
            },
          ],
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12,
        },
      ],
      btnList: [{ text: "Submit" }],
    },
  ],
};
