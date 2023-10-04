"use client";

import React, { useEffect } from 'react';
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
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FilterComponent from './FilterComponent';
import "@/styles/table.scss";

const Table = ({
  data = [],
  columns = [],
  renderer = {},
  errorMessage = "No data found",
  pagination = {},
  count = 0,
}) => {
  const router = useRouter();
  const {
    isShowFirstButton = true,
    isShowLastButton = true,
    numberOfPages = 0,
    currentPage = 0,
    itemsPerPage = 10,
    handleChange = () => { },
  } = pagination;

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, count);

  const renderCell = (row, column, trowIndex, tcolIndex) => {
    const {
      hide,
      key,
      actions,
      onClick,
      target,
      showToolTip,
      toolTipKey
    } = column;
    const type = column.type || "text";
    const cell = row[key];

    const content = {
      file: <Image src={cell} alt="img" height={40} />,
      innerHTML: <span dangerouslySetInnerHTML={{ __html: cell, }}></span>,
      text: <span>{showToolTip ? row[toolTipKey] : cell}</span>,
      link: <a href={cell} target={target || '_blank'}>{cell}</a>,
      actions:
        <Box>
          {actions?.map((action, actionIndex) => (
            <React.Fragment key={`action_${actionIndex}`}>
              <span
                style={{ cursor: 'pointer' }}
                className={action.actionClass}
                onClick={(event) => {
                  event.stopPropagation();
                  action.onClickAction(
                    {
                      action,
                      row,
                      actionIndex,
                      cell
                    },
                    event
                  )
                }
                }
              >
                <action.icon />
              </span>
            </React.Fragment>
          ))}
        </Box>,
      renderer:
        renderer?.[column?.rendererKey]?.({
          trowIndex,
          tcolIndex,
          row,
          cell,
          key: key,
          value: cell,
        }),
      array:
        <span>
          {cell?.multiValue?.map(
            (multiVal, multiIndex) => (
              <span
                hidden={hide}
                key={`mutli_${multiIndex}`}
              >
                {multiVal?.value}
              </span>
            )
          )}
        </span>
    }[type];

    return (
      <TableCell
        hidden={hide}
        onClick={(event) => onClick && onClick(
          {
            action: { key },
            row,
            trowIndex
          },
          event
        )}
      >
        {showToolTip
          ? <Tooltip enterDelay={500} leaveDelay={200} title={cell.toolTipText}>{content}</Tooltip>
          : content
        }
      </TableCell>
    );
  }

  const handleFilterSubmit = (filterValues) => {
    console.log('[Filter Values]', filterValues);
  };

  const onPageChange = (event, newPage) => {
    router.push(`?page=${newPage}`);
    handleChange(event, newPage);
  }

  return (
    <>
      <FilterComponent columns={columns} onFilterSubmit={handleFilterSubmit} />
      <TableContainer
        component={Paper}
        style={{ width: "100%", marginTop: "15px", marginBottom: "15px" }}
      >
        <DataTable className={"common-table"}>
          <TableHead>
            <TableRow key={"thead-key"}>
              {
                columns.map((column, index) => {
                  const {
                    hide,
                    headClass,
                    label,
                  } = column;
                  return (
                    <TableCell
                      hidden={hide}
                      key={`thead_${index}`}
                      className={headClass}
                    >
                      {label}
                    </TableCell>
                  );
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((row, trowIndex) => (
              <TableRow key={`tdatarow_${trowIndex}`}>
                {columns.map((column, tcolIndex) => renderCell(row, column, trowIndex, tcolIndex))}
              </TableRow>
            ))}
            {data?.length === 0 && (
              <TableRow key={"error-message"}>
                <TableCell
                  colSpan={columns?.length}
                  align="center"
                >
                  {data?.length === 0 && errorMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </DataTable>
      </TableContainer>

      <div className="bottom-pagination">
        <div className="table-rows-counter">
          <p>
            Showing {startIndex} to {endIndex} of {count} entries
          </p>
        </div>
        <div className="table-pagination">
          {(
            <Pagination
              count={numberOfPages}
              showFirstButton={isShowFirstButton}
              showLastButton={isShowLastButton}
              page={currentPage}
              onChange={onPageChange}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Table;