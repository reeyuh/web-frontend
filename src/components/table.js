"use client";

import React from "react";
import {
  Box,
  Paper,
  Table as DataTable,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Pagination,
  Tooltip,
} from "@mui/material";
import Image from "next/image";
import "@/styles/table.scss";

const Table = ({
  data = [],
  columns = [],
  renderers = {},
  errorMessage = "No data found",
  pagination = {},
  onClickFns = {},
}) => {
  const {
    isShowFirstButton = true,
    isShowLastButton = true,
    numberOfPages = 0,
    currentPage = 0,
    itemsPerPage = 10,
    handleChange = () => {},
    count = 0,
  } = pagination;

  const startIndex = count > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, count);

  const renderCell = (row, column, trowIndex, tcolIndex) => {
    const {
      hide,
      key,
      actions,
      clickFnName,
      target,
      showToolTip,
      toolTipKey,
      componentName,
      componentProps,
    } = column;

    if (hide) {
      return null;
    }

    const type = column.type || "text";
    const cell = row[key];

    const Component = renderers?.[componentName];

    const content = {
      image: <Image src={cell} alt="img" height={40} />,
      innerHTML: <span dangerouslySetInnerHTML={{ __html: cell }}></span>,
      text: cell,
      link: (
        <a href={cell} target={target || "_blank"}>
          {cell}
        </a>
      ),
      actions: (
        <Box>
          {actions?.map((action, actionIndex) => (
            <React.Fragment key={`action_${actionIndex}`}>
              <span
                style={{ cursor: "pointer" }}
                className={action.actionClass}
                onClick={(event) => {
                  event.stopPropagation();
                  action?.clickFnName &&
                    onClickFns?.[action.clickFnName]?.(
                      {
                        row,
                        column,
                        trowIndex,
                        tcolIndex,
                        action,
                        actionIndex,
                        cell,
                      },
                      event
                    );
                }}
              >
                {action.icon && <action.icon />}
                {action.text && (
                  <span className={action.className}> {action.text}</span>
                )}
              </span>
            </React.Fragment>
          ))}
        </Box>
      ),
      renderer: Component && (
        <Component
          {...cell}
          {...componentProps}
          cell={cell}
          row={row}
          column={column}
          trowIndex={trowIndex}
          tcolIndex={tcolIndex}
        />
      ),
      array: (
        <>
          {!hide &&
            cell?.multiValue?.map((multiVal, multiIndex) => (
              <span key={`mutli_${trowIndex}${tcolIndex}${multiIndex}`}>
                {multiVal?.value}
              </span>
            ))}
        </>
      ),
    }[type];

    return (
      <TableCell
        key={`tdata_cell_${trowIndex}${tcolIndex}`}
        onClick={(event) =>
          clickFnName &&
          onClickFns?.[clickFnName]?.(
            {
              row,
              column,
              trowIndex,
              tcolIndex,
              cell,
            },
            event
          )
        }
      >
        {showToolTip ? (
          <Tooltip enterDelay={500} leaveDelay={200} title={row[toolTipKey]}>
            {content}
          </Tooltip>
        ) : (
          content
        )}
      </TableCell>
    );
  };

  return (
    <>
      <TableContainer component={Paper} className="common-card">
        <DataTable>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => {
                const { hide, headClass, label } = column;
                if (hide) {
                  return null;
                }
                return (
                  <TableCell key={`thead_${index}`} className={headClass}>
                    {label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, trowIndex) => (
                <TableRow key={`tdatarow_${trowIndex}`}>
                  {columns.map((column, tcolIndex) =>
                    renderCell(row, column, trowIndex, tcolIndex)
                  )}
                </TableRow>
              ))}
            {data?.length === 0 && (
              <TableRow key={"error-message"}>
                <TableCell colSpan={columns?.length} align="center">
                  {data?.length === 0 && errorMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </DataTable>
      </TableContainer>

      <div className="d-flex align-items-center justify-content-between my-4">
        <p className="m-0">
          Showing {startIndex} to {endIndex} of {count} entries
        </p>
        <div>
          <Pagination
            count={numberOfPages}
            showFirstButton={isShowFirstButton}
            showLastButton={isShowLastButton}
            page={currentPage}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default Table;
