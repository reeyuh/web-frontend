import React, { useState } from "react";
import { Form } from "../form";

const UserFilters = ({
  initialValues,
  onFilter = () => { }
}) => {

  const formSubmit = (data) => {
    onFilter(data);
  };

  const formData = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter name",
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      placeholder: "Select role",
      options: [
        { value: "admin", label: "Admin" },
        { value: "user", label: "User" },
      ],
    },
    {
      name: "createdDate",
      label: "Created Date",
      type: "date",
      placeholder: "Select date",
      dateType: "single",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "Select status",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  ];

  const btnList = [
    { text: "Filter" },
  ];

  return (
    <Form
      list={[{ name: "Filters", fields: formData }]}
      formSubmit={formSubmit}
      values={initialValues}
      btnList={btnList}
    />
  );
};

export default UserFilters;
