"use client";

import { Table, Modal } from "@/components";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SECURITY_COLUMNS } from "@/data/securityData";
import { apiList, getService, postService } from "@/utils";
import { useRouter } from "next/navigation";
import { getPaginationProps } from "@/utils/commonFn";
import { Tooltip } from "@mui/material";

const UserAccessItem = ({ access }) =>
  access.user && (
    <Tooltip title={access.permission}>
      <span className="common-pointer common-circle-user me-1 mb-1">
        {access.user}
      </span>
    </Tooltip>
  );

const Access = ({ row, clickOnMore }) => (
  <div>
    {row.access.map((access, index) => (
      <UserAccessItem key={index} access={access} />
    ))}
    {row.user_count > 3 && (
      <span onClick={() => clickOnMore(row.location)}>
        <u className="common-pointer common-more">More...</u>
      </span>
    )}
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
      `${apiList.securityDashboard}?offset=${
        (pageCount - 1) * itemsPerPage
      }&limit=${itemsPerPage}`
    );
    const response = result[0]?.data;
    if (response) {
      const list = response.list.map((item, index) => ({
        ...item,
        access: mapUserAccessList(item.access),
      }));
      setData(list);
      setTotalCount(response.total_count);
      setIsLoading(false);
    }
  };

  const mapUserAccessList = (userList) => {
    return userList.map((user) => ({
      user: user[0],
      permission:
        user[1].length > 0
          ? user[1].map((permission) => permission).join(",")
          : "permission is not found",
    }));
  };

  const fetchAccessUserData = async (path) => {
    const result = await postService(apiList.accessUserList, {
      path,
    });
    if (result[0]?.data) {
      const userList = result[0].data?.users_list || [];
      if (userList.length > 0) {
        setLisOfAccess(mapUserAccessList(userList));
      }
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
    router.push(`?page=${page}`, { scroll: true });
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
          <UserAccessItem key={index} access={access} />
        ))}
        {accessUserErr && <div className="error">{accessUserErr}</div>}
      </Modal>
    </>
  );
}
