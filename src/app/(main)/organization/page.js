"use client";

import { Table, Modal, CommonContext, Form } from "@/components";
import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { ORG_COLUMNS, ORG_INPUTS } from "@/data/orgData";
import { apiList, getService, postService } from "@/utils";
import { useRouter } from "next/navigation";
import { getPaginationProps } from "@/utils/commonFn";

export default function SecurityTable() {
  const { setFns } = useContext(CommonContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [data, setData] = useState([]);
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

  const fetchData = async (pageCount) => {
    const result = await getService(
      `${apiList.orgList}?offset=${
        (pageCount - 1) * itemsPerPage
      }&limit=${itemsPerPage}`
    );
    const response = result[0]?.data;
    if (response) {
      setData(response.org_list);
      setTotalCount(response.total_count);
      setIsLoading(false);
    }
  };

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

  const handlePaginationChange = (event, page) => {
    router.push(`?page=${page}`, { scroll: true });
  };

  const closeModal = () => {
    setOpenModal(false);
  };

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
