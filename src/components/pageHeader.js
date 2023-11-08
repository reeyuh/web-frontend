"use client";

import React, { useContext } from "react";
import "@/styles/page-header.scss";
import { PrimaryButton } from "./primaryButton";
import { CommonContext } from "./commonProvider";
import { usePathname } from "next/navigation";
import { PAGE_HEADER } from "@/data/pageHeaderData";

const PageHeader = () => {
  const pathname = usePathname();
  const { fns } = useContext(CommonContext);

  const { btnList, title, summary } = PAGE_HEADER?.[pathname] || {};

  const btnAction = (clickFn) => {
    fns?.[clickFn]?.();
  };

  return (
    title && (
      <div className="page-header d-flex justify-content-between align-items-baseline mt-4">
        <div>
          <h2 className="page-header-title mb-0">{title}</h2>
          <p>{summary}</p>
        </div>
        {btnList?.map((btnItem, index) => (
          <div key={index} onClick={() => btnAction(btnItem.clickFn)}>
            <PrimaryButton text={btnItem.text} />
          </div>
        ))}
      </div>
    )
  );
};

export { PageHeader };
