"use client";

import { Table, Modal } from "@/components";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CONTROL_COLUMNS } from "@/data/controlManagementData";
import { apiList, getService, postService } from "@/utils";
import { useRouter } from "next/navigation";
import { getPaginationProps } from "@/utils/commonFn";
import { Tooltip } from "@mui/material";



""" Renders a tooltip with user access information."""
"""@param {Object} access - The access object containing user and permissions. """

const UserAccessItem = ({ access }) =>
  access.user && (
    <Tooltip title={access.permission}>
      <span className="common-pointer common-circle-user me-1 mb-1">
        {access.user}
      </span>
    </Tooltip>
  );


""" Renders the list of access users with the option to view more."""
"""@param {Object} row - The row object containing access information."""
"""@param {Function} clickOnMore - Function to handle 'More' click event.""""

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


"""Manages security controls and displays access user information."""

export default function SecurityTable() {
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
  const [lisOfAccess, setLisOfAccess] = useState([]);
  const [accessUserErr, setAccessUserErr] = useState("");

""" Fetches security control data from the server. """

  const fetchData = async (pageCount) => {
    const result = await getService(
      `${apiList.securityDashboard}?offset=${
        (pageCount - 1) * itemsPerPage
      }&limit=${itemsPerPage}`
    );
    const response = result[0]?.data;
    setIsLoading(false);
    if (response) {
      const list = response.list.map((item, index) => ({
        ...item,
        access: mapUserAccessList(item.access),
      }));
      setData(list);
      setTotalCount(response.total_count);
    } else {
      setErrMessage(result[1].message);
    }
  };

  """Maps the list of access users."""

  const mapUserAccessList = (userList) => {
    return userList.map((user) => ({
      user: user[0],
      permission:
        user[1].length > 0
          ? user[1].map((permission) => permission).join(",")
          : "permission is not found",
    }));
  };

  """ Fetches access user data for a specific location. """
  const fetchAccessUserData = async (path) => {
    const result = await postService(apiList.accessUserList, {
      path: path.replace("Dynamodb - ", "").replace("s3 - ", ""),
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

  """Handles the 'More' button click event. """

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

"""Handles the pagination change event."""

  const handlePaginationChange = (event, page) => {
    router.push(`?page=${page}`, { scroll: true });
  };

"""Closes the modal dialog."""

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
        columns={CONTROL_COLUMNS}
        data={data}
        errorMessage={errMessage}
        isLoading={isLoading}
        renderers={renderer}
      />
      <Modal
        open={openModal}
        closeModal={closeModal}
        maxWidth={500}
        minWidth={500}
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
