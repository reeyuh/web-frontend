"use client";

import Table from "@/components/table";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AGENT_COLUMNS } from "@/data/agentStatusData";
import { getService, apiList } from "@/utils";
import { useRouter } from "next/navigation";

export default function AgentStatus() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const itemsPerPage = 10;

  const fetchData = async () => {
    const result = await getService(
      `${apiList.agentStatus}&offset=${
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
      columns={AGENT_COLUMNS}
      data={data}
    />
  );
}
