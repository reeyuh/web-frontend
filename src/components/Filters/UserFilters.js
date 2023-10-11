import React, { useState } from "react";
import { Form } from "../form";
import { USER_FILTERS } from "@/data/filters/userFilters";

const UserFilters = ({
  initialValues,
  onFilter = () => { }
}) => {

  const formSubmit = (data) => {
    onFilter(data);
  };


  const btnList = [
    { text: "Filter" },
  ];

  return (
    <Form
      list={[{ name: "Filters", fields: USER_FILTERS }]}
      formSubmit={formSubmit}
      values={initialValues}
      btnList={btnList}
    />
  );
};

export default UserFilters;
