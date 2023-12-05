"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CircularProgress } from "@mui/material";
import { getService, apiList } from "@/utils";

export default function Dashboard() {
  const [agentCount, setAgentCount] = useState();
  const [agentError, setAgentError] = useState();
  const [fileTypeCount, setFileTypeCount] = useState();
  const [fileTypeError, setFileTypeError] = useState();
  const [userCount, setUserCount] = useState();
  const [userError, setUserError] = useState();

  const fetchData = async (api, setCounts, setError) => {
    const result = await getService(api);
    if (result[0]?.data) {
      setCounts(result[0]?.data);
    } else {
      setError(result[0]?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchData(apiList.dashboardFileType, setFileTypeCount, setFileTypeError);
    fetchData(apiList.dashboardAgentStatus, setAgentCount, setAgentError);
    fetchData(apiList.dashboardUserManagement, setUserCount, setUserError);
  }, []);

  return (
    <>
      <div className="mt-4 pt-2 ">
        <h4 className="dashboard-head mb-4">Welcome to TrueNil!</h4>
        <div className="d-xxl-flex gap-2 flex-wrap">
          <div className="common-fill dashboard-card-item d-flex flex-column pb-4">
            <h5 className="dashboard-title">
              <a href="/security-dashboard">Security Dashboard</a>
            </h5>
            <Card
              sx={{ overflow: "visible" }}
              className="common-card mt-0 text-center common-fill"
            >
              {fileTypeCount ? (
                <CardContent className="d-flex gap-2 p-md-3 p-2 flex-wrap">
                  <div className="dashboard-box d-flex flex-column">
                    <div className="d-flex m-1 m-md-2 gap-1 common-fill justify-content-evenly">
                      <div className="dashboard-inner-box px-1">
                        <p className="dashboard-inner-count pt-4 pb-2">
                          {" "}
                          {fileTypeCount.PII || 0}
                        </p>
                        <p className="dashboard-inner-text">PII</p>
                      </div>
                      <div className="dashboard-inner-box px-1">
                        <p className="dashboard-inner-count  pt-4 pb-2">
                          {fileTypeCount.PHI || 0}
                        </p>
                        <p className="dashboard-inner-text">PHI</p>
                      </div>
                      <div className="dashboard-inner-box px-1">
                        <p className="dashboard-inner-count pt-4 pb-2">
                          {" "}
                          {fileTypeCount.PCI || 0}
                        </p>
                        <p className="dashboard-inner-text">PCI</p>
                      </div>
                      <div className="dashboard-inner-box px-1">
                        <p className="dashboard-inner-count  pt-4 pb-2">
                          {" "}
                          {fileTypeCount.Genomic || 0}
                        </p>
                        <p className="dashboard-inner-text">Genomics</p>
                      </div>
                    </div>
                    <p className="mb-2 mt-1">Sensitive Data Type</p>
                  </div>
                  <div className="dashboard-box d-flex flex-column">
                    <div className="d-flex m-1 m-md-2 gap-1 common-fill justify-content-evenly">
                      <div className="dashboard-inner-box px-1">
                        <p className="dashboard-inner-count  pt-4 pb-2 common-danger">
                          {fileTypeCount.without_encryption_count || 0}
                        </p>
                        <p className="dashboard-inner-text">
                          Without Encryption
                        </p>
                      </div>
                      <div className="dashboard-inner-box px-1">
                        <p className=" dashboard-inner-count  pt-4 pb-2 common-warning">
                          {fileTypeCount.without_access_control_count || 0}
                        </p>
                        <p className="dashboard-inner-text">
                          Without Access Control
                        </p>
                      </div>
                    </div>
                    <p className="mt-1 mb-2">Open risks</p>
                  </div>
                </CardContent>
              ) : (
                <div className="dashboard-min-height d-flex align-items-center justify-content-center">
                  {fileTypeError ? (
                    <span className="error">{fileTypeError}</span>
                  ) : (
                    <CircularProgress />
                  )}
                </div>
              )}
            </Card>
          </div>
          <div className="common-fill dashboard-card-item  d-flex flex-column pb-4">
            <h5 className="dashboard-title">
              <a href="/agent-status"> Agent Status</a>
            </h5>
            <Card
              sx={{ overflow: "visible" }}
              className="common-card mt-0 text-center common-fill"
            >
              {agentCount ? (
                <CardContent className="d-flex gap-2 p-md-3 p-2 flex-wrap">
                  <div className="dashboard-box d-flex align-items-center flex-column px-2">
                    <p className="dashboard-box-count my-4 pt-2 common-success">
                      {agentCount.online_agents || 0}
                    </p>
                    <p className="mb-3">Online</p>
                  </div>
                  <div className="dashboard-box d-flex align-items-center flex-column px-2">
                    <p className="dashboard-box-count my-4 pt-2 common-danger">
                      {agentCount.offile_agents || 0}
                    </p>
                    <p className="mb-3">Offline</p>
                  </div>
                  <div className="dashboard-box d-flex align-items-center flex-column px-2">
                    <p className="dashboard-box-count my-4 pt-2 common-success">
                      {agentCount.healthy_status || 0}
                    </p>
                    <p className="mb-3">Healthy Agents</p>
                  </div>
                  <div className="dashboard-box d-flex align-items-center flex-column px-2">
                    <p className="dashboard-box-count my-4 pt-2 common-warning">
                      {agentCount.unhealthy_status || 0}
                    </p>
                    <p className="mb-3">Unhealthy Agents</p>
                  </div>
                  <div className="dashboard-box d-flex align-items-center flex-column px-2">
                    <p className="dashboard-box-count my-4 pt-2 common-danger">
                      {agentCount.critical_status || 0}
                    </p>
                    <p className="mb-3">Critical Agents</p>
                  </div>
                </CardContent>
              ) : (
                <div className="dashboard-min-height d-flex align-items-center justify-content-center">
                  {agentError ? (
                    <span className="error">{agentError}</span>
                  ) : (
                    <CircularProgress />
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <div className="common-fill dashboard-card-item  d-flex flex-column mb-4">
            <h5 className="dashboard-title">
              <a href="/users"> User Management</a>
            </h5>
            <Card
              sx={{ overflow: "visible" }}
              className="common-card mt-0 common-fill text-center"
            >
              {userCount ? (
                <CardContent className="d-flex gap-2 p-md-3 p-2 flex-wrap">
                  <div className="dashboard-box d-flex flex-column px-2">
                    <p className="dashboard-box-count my-4 pt-2">
                      {userCount.admin_count || 0}
                    </p>
                    <p className="mb-3">Admin</p>
                  </div>
                  <div className="dashboard-box d-flex flex-column px-2">
                    <p className="dashboard-box-count my-4 pt-2">
                      {userCount.researcher_count || 0}
                    </p>
                    <p className="mb-3">Researcher</p>
                  </div>
                  <div className="dashboard-box d-flex flex-column px-2">
                    <p className="dashboard-box-count my-4 pt-2">
                      {userCount.operator_count || 0}
                    </p>
                    <p className="mb-3">Operator</p>
                  </div>
                </CardContent>
              ) : (
                <div className="dashboard-user-min-height d-flex align-items-center justify-content-center">
                  {userError ? (
                    <span className="error">{userError}</span>
                  ) : (
                    <CircularProgress />
                  )}
                </div>
              )}
            </Card>
          </div>
          <div className="common-fill dashboard-card-item  d-flex flex-column mb-4">
            <h5 className="dashboard-title">
              <a href="/control-management">Control Management</a>
            </h5>
            <Card
              sx={{ overflow: "visible" }}
              className="common-card mt-0 common-fill text-center"
            >
              <CardContent className="d-flex gap-2 p-md-3 p-2 flex-wrap">
                <div className="dashboard-box d-flex flex-column px-2">
                  <p className="dashboard-box-count my-4 pt-2 common-success">
                    34
                  </p>
                  <p className="mb-3">Security Controls in Place</p>
                </div>
                <div className="dashboard-box d-flex flex-column px-2">
                  <p className="dashboard-box-count my-4 pt-2 common-warning">
                    0
                  </p>
                  <p className="mb-3">Security Controls Missing</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
