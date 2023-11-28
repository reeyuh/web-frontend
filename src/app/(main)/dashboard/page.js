"use client";

import Table from "@/components/table";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Select, MenuItem, Card, CardContent } from "@mui/material";
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
    router.push(`?page=${page}`, { scroll: true });
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
    <>
      <div className="mt-4 pt-2 ">
        <h4 className="dashboard-head mb-4">Welcome to TrueNil!</h4>
        <div className="d-flex gap-2 flex-wrap">
          <div className="common-fill dashboard-card-item d-flex flex-column pb-4">
            <h5 className="dashboard-title">Security Dashboard</h5>
            <Card
              sx={{ overflow: "visible" }}
              className="common-card mt-0 text-center common-fill"
            >
              <CardContent className="d-flex gap-2 p-md-3 p-2 flex-wrap">
                <div className="dashboard-box d-flex flex-column">
                  <div className="d-flex m-1 m-md-2 gap-1 common-fill justify-content-evenly">
                    <div className="dashboard-inner-box px-1">
                      <p className="dashboard-inner-count pt-3">10</p>
                      <p className="dashboard-inner-text">PII</p>
                    </div>
                    <div className="dashboard-inner-box px-1">
                      <p className="dashboard-inner-count pt-3">4</p>
                      <p className="dashboard-inner-text">PHI</p>
                    </div>
                    <div className="dashboard-inner-box px-1">
                      <p className="dashboard-inner-count pt-3">40</p>
                      <p className="dashboard-inner-text">PCI</p>
                    </div>
                    <div className="dashboard-inner-box px-1">
                      <p className="dashboard-inner-count pt-3">60</p>
                      <p className="dashboard-inner-text">Genomics</p>
                    </div>
                  </div>
                  <p className="mb-2 mt-1">Sensitive Data Type</p>
                </div>
                <div className="dashboard-box d-flex flex-column">
                  <div className="d-flex m-1 m-md-2 gap-1 common-fill justify-content-evenly">
                    <div className="dashboard-inner-box px-1">
                      <p className="dashboard-inner-count pt-3 common-danger">
                        50
                      </p>
                      <p className="dashboard-inner-text">Without Encryption</p>
                    </div>
                    <div className="dashboard-inner-box px-1">
                      <p className=" dashboard-inner-count pt-3 common-warning">
                        5
                      </p>
                      <p className="dashboard-inner-text">
                        Without Access Control
                      </p>
                    </div>
                  </div>
                  <p className="mt-1 mb-2">Open risks</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="common-fill dashboard-card-item  d-flex flex-column pb-4">
            <h5 className="dashboard-title">Agent Status</h5>
            <Card
              sx={{ overflow: "visible" }}
              className="common-card mt-0 text-center common-fill"
            >
              <CardContent className="d-flex gap-2 p-md-3 p-2 flex-wrap">
                <div className="dashboard-box d-flex align-items-center flex-column px-2">
                  <p className="dashboard-box-count my-4 pt-2 common-success">
                    560
                  </p>
                  <p className="mb-3">Online</p>
                </div>
                <div className="dashboard-box d-flex align-items-center flex-column px-2">
                  <p className="dashboard-box-count my-4 pt-2 common-danger">
                    50
                  </p>
                  <p className="mb-3">Offline</p>
                </div>
                <div className="dashboard-box d-flex align-items-center flex-column px-2">
                  <p className="dashboard-box-count my-4 pt-2 common-success">
                    555
                  </p>
                  <p className="mb-3">Healthy Agents</p>
                </div>
                <div className="dashboard-box d-flex align-items-center flex-column px-2">
                  <p className="dashboard-box-count my-4 pt-2 common-warning">
                    43
                  </p>
                  <p className="mb-3">Compromised Agents</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <div className="common-fill dashboard-card-item  d-flex flex-column mb-4">
            <h5 className="dashboard-title">User Management</h5>
            <Card
              sx={{ overflow: "visible" }}
              className="common-card mt-0 common-fill text-center"
            >
              <CardContent className="d-flex gap-2 p-md-3 p-2 flex-wrap">
                <div className="dashboard-box d-flex flex-column px-2">
                  <p className="dashboard-box-count my-4 pt-2">43</p>
                  <p className="mb-3">Admin</p>
                </div>
                <div className="dashboard-box d-flex flex-column px-2">
                  <p className="dashboard-box-count my-4 pt-2">34</p>
                  <p className="mb-3">Researcher</p>
                </div>
                <div className="dashboard-box d-flex flex-column px-2">
                  <p className="dashboard-box-count my-4 pt-2">65</p>
                  <p className="mb-3">Operator</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="common-fill dashboard-card-item  d-flex flex-column mb-4">
            <h5 className="dashboard-title">Control Management</h5>
            <Card
              sx={{ overflow: "visible" }}
              className="common-card mt-0 common-fill text-center"
            >
              <CardContent className="d-flex gap-2 p-md-3 p-2 flex-wrap">
                <div className="dashboard-box d-flex flex-column px-2">
                  <p className="dashboard-box-count my-4 pt-2 common-success">
                    34
                  </p>
                  <p className="mb-3">Security Controls in Place</p>
                </div>
                <div className="dashboard-box d-flex flex-column px-2">
                  <p className="dashboard-box-count my-4 pt-2 common-warning">
                    0
                  </p>
                  <p className="mb-3">Security Controls Missing</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
