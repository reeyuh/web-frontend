"use client";

import Table from "@/components/table";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { USER_COLUMNS } from "@/data/userData";
import { apiList } from "@/utils";
import { useRouter } from "next/navigation";

export default function UserList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiList.userData}&offset=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}`
        );
        const result = await response.json();
        if (result.docs) {
          setData(result.docs);
          setTotalCount(result.numFound);
        }
      } catch (error) {
        console.error("Error fetching security data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePaginationChange = (event, page) => {
    router.push(`?page=${page}`);
  };

  return (
    <Table
      pagination={{
        numberOfPages: Math.ceil(totalCount / itemsPerPage),
        currentPage: totalCount > 0 ? currentPage : 0,
        count: totalCount,
        handleChange: handlePaginationChange,
      }}
      columns={USER_COLUMNS}
      data={data}
    />
  );
}
