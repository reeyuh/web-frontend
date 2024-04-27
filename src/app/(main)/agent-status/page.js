"use client";

import Table from "@/components/table";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AGENT_COLUMNS } from "@/data/agentStatusData";
import { getService, apiList } from "@/utils";
import { useRouter } from "next/navigation";
import { getPaginationProps } from "@/utils/commonFn";

"""""Renders the live/offline status of an agent. """""

const LiveOffline = ({ row }) => (
  <>
    {row.alive_status === "off" ? (
      <div className={`common-offline`}>
        <span className="common-offline-dot d-inline-block me-2"></span>Offline
      </div>
    ) : (
      <div className={`common-live`}>
        <span className="common-live-dot d-inline-block me-2"></span>Live
      </div>
    )}
  </>
);

"""""Renders the health status of an agent."""""


const HealthStatus = ({ row }) => {

""" Determines the CSS class based on the health status value. """

  const getClass = (value) => {
    if (value >= 90) {
      return "critical";
    } else if (value > 80 && value < 90) {
      return "unhealthy";
    } else if (value <= 80) {
      return "healthy";
    }
  };
  return (
    <>
      {row.cpu_percentage >= 0 && (
        <div
          className={`mb-1 me-1 common-circle-${getClass(row.cpu_percentage)}`}
        >
          CPU: {row.cpu_percentage}%
        </div>
      )}
      {row.ram_percentage >= 0 && (
        <div
          className={`mb-1 me-1 common-circle-${getClass(row.ram_percentage)}`}
        >
          RAM: {row.ram_percentage}%
        </div>
      )}
      {row.disk_percentage >= 0 && (
        <div className={`common-circle-${getClass(row.disk_percentage)}`}>
          Disk: {row.disk_percentage}%
        </div>
      )}
    </>
  );
};

""" Displays and manages agent status data. """

export default function AgentStatus() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [data, setData] = useState([]);
  const [errMessage, setErrMessage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const itemsPerPage = 10;

""" Fetches agent status data from the server based on the current page. """

  const fetchData = async (pageCount) => {
    setData([]);
    setIsLoading(true);
    const result = await getService(
      `${apiList.agentStatus}?offset=${
        (pageCount - 1) * itemsPerPage
      }&limit=${itemsPerPage}`
    );

    setIsLoading(false);
    if (result[0]?.data) {
      setData(result[0].data.list);
      setTotalCount(result[0].data.total_count);
    } else {
      setErrMessage(result[1].message);
    }
  };

  useEffect(() => {
    const pageCount = parseInt(page);
    setCurrentPage(pageCount);
    fetchData(pageCount);
  }, [page]);


""" Handles the pagination change event."""


  const handlePaginationChange = (event, page) => {
    router.push(`?page=${page}`, { scroll: true });
  };

""" Renderer functions for custom cell rendering in the table."""

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
      errorMessage={errMessage}
      isLoading={isLoading}
      renderers={renderer}
    />
  );
}
