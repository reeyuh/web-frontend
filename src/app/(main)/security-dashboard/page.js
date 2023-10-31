"use client";

import { Table, Modal } from "@/components";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SECURITY_COLUMNS } from "@/data/securityData";
import { apiList, getService } from "@/utils";
import { useRouter } from "next/navigation";
import { getPaginationProps } from "@/utils/commonFn";

const Access = ({ row, clickOnMore }) => (
  <div>
    {row.access.map((access, index) => (
      <span key={index} className="common-circle-user me-1 mb-1">
        {access}
      </span>
    ))}
    <span onClick={() => clickOnMore(row.filename)}>
      <u role="button">More...</u>
    </span>
  </div>
);

export default function SecurityTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const itemsPerPage = 10;
  const [openModal, setOpenModal] = useState(false);
  const [lisOfAccess, setLisOfAccess] = useState([]);
  const [accessUserErr, setAccessUserErr] = useState("");

  const fetchData = async (pageCount) => {
    const result = await getService(
      `${apiList.securityData}?offset=${
        (pageCount - 1) * itemsPerPage
      }&limit=${itemsPerPage}`
    );
    if (result[0]?.data) {
      setData(result[0].data.list);
      setTotalCount(result[0].data.total_count);
      setIsLoading(false);
    }
  };

  const fetchAccessUserData = async (filename) => {
    const result = await getService(
      `${apiList.securityData}?offset=0&limit=2`,
      { filename }
    );
    if (result[0]?.data) {
      setLisOfAccess(result[0].data.list);
    } else {
      setAccessUserErr("Something went wrong, please try again!");
    }
  };

  const clickOnMore = (filename) => {
    setOpenModal(true);
    fetchAccessUserData(filename);
  };

  const renderer = {
    Access: ({ row, key }) => (
      <Access row={row} key={key} clickOnMore={clickOnMore} />
    ),
  };

  useEffect(() => {
    const pageCount = parseInt(page);
    setCurrentPage(pageCount);
    fetchData(pageCount);
  }, [page]);

  const handlePaginationChange = (event, page) => {
    router.push(`?page=${page}`);
  };

  const closeModal = () => {
    setLisOfAccess([]);
    setAccessUserErr("");
    setOpenModal(false);
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
        columns={SECURITY_COLUMNS}
        data={data}
        isLoading={isLoading}
        renderers={renderer}
      />
      <Modal
        open={openModal}
        closeModal={closeModal}
        width="400"
        title="List of access user"
      >
        {!accessUserErr && lisOfAccess.length === 0 && <div>Loading..</div>}
        {lisOfAccess.map((access, index) => (
          <span
            key={`${index}_access_list`}
            className="common-circle-user me-1 mb-1"
          >
            {access}
          </span>
        ))}
        {accessUserErr && <div className="error">{accessUserErr}</div>}
      </Modal>
    </>
  );
}
