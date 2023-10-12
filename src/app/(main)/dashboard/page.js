"use client";

import Table from "@/components/table";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Select, MenuItem } from "@mui/material";
import { SAMPLE_COLUMNS } from "@/data/commonData";
import { getService, apiList } from "@/utils";
import { useRouter } from "next/navigation";
import { getPaginationProps } from "@/utils/commonFn";

const RenderActiveColumn = ({ row, cell, key, onUpdate }) => {
  const [activeValue, setActiveValue] = useState(cell);
  const options = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const handleChange = (event) => {
    const updatedValue = event.target.value;
    setActiveValue(updatedValue);
    onUpdate("id", row.id, key, updatedValue);
  };

  return (
    <Select value={activeValue} onChange={handleChange}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const itemsPerPage = 10;

  const renderer = {
    SelectList: ({ row, cell, trowIndex, key }) => (
      <RenderActiveColumn
        row={row}
        key={key}
        cell={cell}
        trowIndex={trowIndex}
        onUpdate={handleActiveChange}
      />
    ),
  };
  const fetchData = async () => {
    const result = await getService(
      `${apiList.agentStatus}?offset=${
        (currentPage - 1) * itemsPerPage
      }&limit=${itemsPerPage}`
    );
    if (result[0].docs) {
      setData(result[0].docs);
      setTotalCount(result[0].numFound);
    }
  };

  useEffect(() => {
    setCurrentPage(parseInt(page));
    fetchData();
  }, [page]);

  const handlePaginationChange = (event, page) => {
    router.push(`?page=${page}`);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const handleActiveChange = (
    primaryKey,
    value,
    key = "isActive",
    updatedValue
  ) => {};

  const deleteData = (data, e) => {};

  return (
    <Table
      pagination={getPaginationProps(
        totalCount,
        currentPage,
        itemsPerPage,
        handlePaginationChange
      )}
      columns={SAMPLE_COLUMNS}
      data={data}
      renderers={renderer}
      onClickFns={{ deleteData }}
    />
  );
}
