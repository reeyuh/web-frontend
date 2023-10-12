"use client";

import Table from "@/components/table";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AGENT_COLUMNS } from "@/data/agentStatusData";
import { getService, apiList } from "@/utils";
import { useRouter } from "next/navigation";
import { getPaginationProps } from "@/utils/commonFn";

const LiveOffline = ({ row }) => (
  <>
    {row.cpu_usage === "offline" ? (
      <div className={`common-${row.cpu_usage}`}>
        <span className="common-offline-dot d-inline-block me-2"></span>Offline
      </div>
    ) : (
      <div className={`common-live`}>
        <span className="common-live-dot d-inline-block me-2"></span>Live
      </div>
    )}
  </>
);

const HealthStatus = ({ row }) => {
  return (
    <>
      <div className={`mb-1 common-circle-${row.cpu_usage}`}>
        CPU Status: {row.cpu_usage}
      </div>
      <div className={`mb-1 common-circle-${row.ram_usage}`}>
        RAM Status: {row.ram_usage}
      </div>
      <div className={`common-circle-${row.disk_usage}`}>
        Disk Status: {row.disk_usage}
      </div>
    </>
  );
};

export default function AgentStatus() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const itemsPerPage = 2;

  const fetchData = async (pageCount) => {
    setData([]);
    setIsLoading(true);
    const result = await getService(
      `${apiList.agentStatus}?offset=${
        (pageCount - 1) * itemsPerPage
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

  const renderer = {
    LiveOffline: ({ row, key }) => <LiveOffline row={row} key={key} />,
    HealthStatus: ({ row, key }) => <HealthStatus row={row} key={key} />,
  };

  return (
    <Table
      pagination={getPaginationProps(
        totalCount,
        currentPage,
        itemsPerPage,
        handlePaginationChange
      )}
      columns={AGENT_COLUMNS}
      data={data}
      isLoading={isLoading}
      renderers={renderer}
    />
  );
}
