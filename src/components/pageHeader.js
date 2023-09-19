"use client";

import React from "react";
import "@/styles/page-header.scss";
import PrimaryButton from "./primaryButton";

const PageHeader = ({ onClick, text, title, summary }) => {
  return (
    <div className="page-header d-flex justify-content-between mt-4">
      <div>
        <h2 className="page-header-title mb-0">{title}</h2>
        <p>{summary}</p>
      </div>
      {text && <PrimaryButton text={text} onClick={onClick} />}
    </div>
  );
};

export { PageHeader };
