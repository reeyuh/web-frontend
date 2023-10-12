"use client";

import Table from "@/components/table";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { USER_COLUMNS } from "@/data/userData";
import { apiList, getService } from "@/utils";
import { useRouter } from "next/navigation";
import { getPaginationProps } from "@/utils/commonFn";

export default function UserList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const itemsPerPage = 10;

  const fetchData = async (pageCount) => {
    const result = await getService(
      `${apiList.userData}&offset=${(currentPage - 1) * itemsPerPage
      }&limit=${itemsPerPage}`
    );
    if (result[0]?.data) {
      setData(result[0].data.list);
      setTotalCount(result[0].data.total_count);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const pageCount = parseInt(page);
    setCurrentPage(pageCount);
    fetchData(pageCount);
  }, [page]);

  const handlePaginationChange = (event, page) => {
    router.push(`?page=${page}`);
  };

  return (
    <Table
      pagination={getPaginationProps(
        totalCount,
        currentPage,
        itemsPerPage,
        handlePaginationChange
      )}
      columns={USER_COLUMNS}
      data={data}
      isLoading={isLoading}
    />
  );
}
