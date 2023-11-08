"use client";

import { Table, Modal, Form } from "@/components";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  USER_COLUMNS,
  USER_INPUTS,
  ROLE_ALIAS,
  SUPER_ADMIN_KEY,
  ADMIN_KEY,
  ROLE_OPTIONS,
} from "@/data/userData";
import { apiList, getService, postService } from "@/utils";
import { useRouter } from "next/navigation";
import { getPaginationProps } from "@/utils/commonFn";

export default function UserList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [data, setData] = useState([]);
  const [errMessage, setErrMessage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const [hiddenCols, setHiddenCols] = useState({ actions: true });
  const [currentUser, setCurrentUser] = useState();
  const [openModal, setOpenModal] = useState(false);
  const itemsPerPage = 10;
  const [formValues, setFormValues] = useState({ role: "" });
  const [userActionHandler, setUserActionHandler] = useState({
    error: "",
    success: "",
    isLoading: false,
    hidden: {},
    disabled: {},
    readonly: {},
    key: "user",
  });
  const [options, setOptions] = useState({});

  const getProfile = async () => {
    const result = await getService(apiList.getProfile);
    if (result[0]?.data) {
      setCurrentUser(result[0]?.data);
      return result[0].data;
    }
    return null;
  };

  const fetchData = async (pageCount) => {
    const currentUser = await getProfile();
    if (currentUser) {
      setHiddenCols(() => ({
        actions: [SUPER_ADMIN_KEY, ADMIN_KEY].indexOf(currentUser.role) === -1,
      }));
    }
    const result = await getService(
      `${apiList.userList}?offset=${
        (pageCount - 1) * itemsPerPage
      }&limit=${itemsPerPage}`
    );

    const response = result[0]?.data;
    setIsLoading(false);
    if (response) {
      response.user_list.forEach((item, index) => {
        response.user_list[index].name = `${item.first_name} ${
          item.last_name
        } ${currentUser.email === item.email ? "(You)" : ""}`;
        response.user_list[index].roleAlias = ROLE_ALIAS[item.role];
      });
      setData(response.user_list);
      setTotalCount(response.total_count);
    } else {
      setErrMessage(result[1].message);
    }
  };

  useEffect(() => {
    const pageCount = parseInt(page);
    setCurrentPage(pageCount);
    fetchData(pageCount);
  }, [page]);

  const handlePaginationChange = (event, page) => {
    router.push(`?page=${page}`, { scroll: true });
  };

  const editUser = (data) => {
    setUserActionHandler((val) => ({
      ...val,
      success: "",
      hidden: {},
      readonly: { role: currentUser.email === data.row.email ? true : false },
      error: "",
    }));

    const options = [...ROLE_OPTIONS];
    if (data.row.role === "superadmin") {
      options.unshift({ label: "Super Admin", value: "superadmin" });
    }

    setOptions(() => ({ role: options }));
    setFormValues(data.row);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const onUpdateUser = async (data) => {
    setUserActionHandler((val) => ({
      ...val,
      isLoading: true,
      success: "",
      error: "",
    }));

    const result = await postService(apiList.editUser, data);
    if (result[0]) {
      setUserActionHandler((val) => ({
        ...val,
        success: "User detail has been updated successfully",
        hidden: { btnSection: true },
        isLoading: false,
        key: val.key + 1,
      }));
      setTimeout(() => {
        setUserActionHandler((val) => ({
          ...val,
          success: "",
          hidden: {},
        }));
        setOpenModal(false);
        fetchData(parseInt(page));
      }, 3000);
    } else {
      setUserActionHandler((val) => ({
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
        columns={USER_COLUMNS}
        data={data}
        errorMessage={errMessage}
        isLoading={isLoading}
        onClickFns={{ editUser }}
        hidden={hiddenCols}
      />

      <Modal
        open={openModal}
        closeModal={closeModal}
        maxWidth={500}
        minWidth={500}
        title="Update User"
      >
        <Form
          list={USER_INPUTS}
          values={formValues}
          actionHandler={userActionHandler}
          formSubmit={onUpdateUser}
          options={options}
        />
      </Modal>
    </>
  );
}
