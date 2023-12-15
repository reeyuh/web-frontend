"use client";

import { Table } from "@/components";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AUDIT_COLUMNS } from "@/data/auditData";
import { apiList, getService } from "@/utils";
import { useRouter } from "next/navigation";
import { getPaginationProps } from "@/utils/commonFn";

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

  const fetchData = async (pageCount) => {
    const result = await getService(
      `${apiList.auditLogs}?offset=${
        (pageCount - 1) * itemsPerPage
      }&limit=${itemsPerPage}`
    );
    const response = result[0]?.data;
    setIsLoading(false);
    if (response) {
      setData(response.audit_list);
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

  return (
    <>
      <Table
        pagination={getPaginationProps(
          totalCount,
          currentPage,
          itemsPerPage,
          handlePaginationChange
        )}
        columns={AUDIT_COLUMNS}
        data={data}
        errorMessage={errMessage}
        isLoading={isLoading}
      />
    </>
  );
}
