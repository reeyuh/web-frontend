"use client";

import { Table, Modal, CommonContext, Form } from "@/components";
import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { ORG_COLUMNS, ORG_INPUTS } from "@/data/orgData";
import { apiList, getService, postService } from "@/utils";
import { useRouter } from "next/navigation";
import { getPaginationProps } from "@/utils/commonFn";

"""SecurityTable component manages organization-related security data."""
"""It handles data fetching, pagination, modal control for organization creation, and form submission for creating organizations."""

export default function SecurityTable() {
  const { setFns } = useContext(CommonContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [data, setData] = useState([]);
  const [errMessage, setErrMessage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const itemsPerPage = 10;
  const [openModal, setOpenModal] = useState(false);
  const [createActionHandler, setCreateActionHandler] = useState({
    error: "",
    success: "",
    isLoading: false,
    hidden: {},
    disabled: {},
    readonly: {},
    key: "user",
  });
""" Fetches organization data from the server based on pagination."""
"""Constructs the API URL with appropriate offset and limit parameters to retrieve a specific page of organization data."""
"""Updates the component state with the fetched data or sets an error message if an error occurs."""
"""@param {number} pageCount - The page number to fetch."""

  const fetchData = async (pageCount) => {
    const result = await getService(
      `${apiList.orgList}?offset=${
        (pageCount - 1) * itemsPerPage
      }&limit=${itemsPerPage}`
    );
    const response = result[0]?.data;
    setIsLoading(false);
    if (response) {
      setData(response.org_list);
      setTotalCount(response.total_count);
    } else {
      setErrMessage(result[1].message);
    }
  };

"""Initiates the organization creation process."""
"""Sets the `openModal` state to `true`, which opens the modal for creating a new organization."""

  const createOrg = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    setFns({ createOrg });
  }, []);

  useEffect(() => {
    const pageCount = parseInt(page);
    setCurrentPage(pageCount);
    fetchData(pageCount);
  }, [page]);

"""Handles pagination change."""
"""Updates the URL query parameter for the page and triggers a router navigation to load the corresponding page of organization data."""
"""@param {Event} event - The event object.""""
"""@param {number} page - The page number to navigate to."""

  const handlePaginationChange = (event, page) => {
    router.push(`?page=${page}`, { scroll: true });
  };

 """Closes the modal used for organization creation."""
 """Sets the `openModal` state to `false`, hiding the modal from the UI."""

  const closeModal = () => {
    setOpenModal(false);
  };

"""Handles form submission for creating a new organization."""
"""Sends a POST request to the server with the organization data."""
"""Updates the UI with success or error messages and refetches organization data if successful."""
"""@param {Object} data - The organization data to submit."""

  const onCreateSubmit = async (data) => {
    setCreateActionHandler((val) => ({
      ...val,
      isLoading: true,
      success: "",
      error: "",
    }));

    const result = await postService(apiList.createOrg, data);
    if (result[0]) {
      setCreateActionHandler((val) => ({
        ...val,
        success: "Organization has been created successfully",
        hidden: { btnSection: true },
        isLoading: false,
        key: val.key + 1,
      }));
      setTimeout(() => {
        setCreateActionHandler((val) => ({
          ...val,
          success: "",
          hidden: {},
        }));
        setOpenModal(false);
        fetchData(parseInt(page));
      }, 3000);
    } else {
      setCreateActionHandler((val) => ({
        ...val,
        isLoading: false,
        error: result[1]?.message,
      }));
    }
  };

  return (
    <>
      <Table
        pagination={getPaginationProps(
          totalCount,
          currentPage,
          itemsPerPage,
          handlePaginationChange
        )}
        columns={ORG_COLUMNS}
        data={data}
        errorMessage={errMessage}
        isLoading={isLoading}
      />
      <Modal
        open={openModal}
        closeModal={closeModal}
        maxWidth={500}
        minWidth={500}
        title="Create Organization"
      >
        <Form
          list={ORG_INPUTS}
          actionHandler={createActionHandler}
          formSubmit={onCreateSubmit}
        />
      </Modal>
    </>
  );
}
