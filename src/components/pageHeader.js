"use client";

import React from "react";
import "@/styles/page-header.scss";
import { PrimaryButton } from "./primaryButton";
import { usePathname } from "next/navigation";
import { PAGE_HEADER } from "@/data/pageHeaderData";

const PageHeader = () => {
  const pathname = usePathname();

  const btnAction = () => {};
  const { btnList, title, summary } = PAGE_HEADER?.[pathname] || {};

  return (
    title && (
      <div className="page-header d-flex justify-content-between align-items-baseline mt-4">
        <div>
          <h2 className="page-header-title mb-0">{title}</h2>
          <p>{summary}</p>
        </div>
        {btnList?.map((btnItem, index) => (
          <PrimaryButton
            key={index}
            text={btnItem.text}
            onClick={() => btnAction(btnItem)}
          />
        ))}
      </div>
    )
  );
};

export { PageHeader };
