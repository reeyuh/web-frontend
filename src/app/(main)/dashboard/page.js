"use client";

import Table from "@/components/table";
import React, { useEffect, useState } from "react";
import Logo from "@/assets/images/logo.png";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSearchParams } from 'next/navigation';
import { Modal, Button, Box, Typography, Select, MenuItem } from "@mui/material";
import SampleData from './sample/sample.json';

const RenderActiveColumn = ({ row, cell, key, onUpdate }) => {
  const [activeValue, setActiveValue] = useState(cell);
  const options = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  const handleChange = (event) => {
    const updatedValue = event.target.value;
    setActiveValue(updatedValue);
    onUpdate('id', row.id, key, updatedValue);
  };

  return (
    <Select
      value={activeValue}
      onChange={handleChange}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default function Dashboard() {
  const search = useSearchParams();

  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedActionItem, setSelectedActionItem] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const renderer = {
    activeRenderer: ({ row, cell, trowIndex, key }) => (
      <RenderActiveColumn row={row} key={key} cell={cell} trowIndex={trowIndex} onUpdate={handleActiveChange} />
    ),
  };

  const columns = [
    {
      key: 'logo',
      label: 'Logo',
      type: 'file',
    },
    {
      key: 'id',
      label: 'User Id'
    },
    {
      key: 'name',
      label: 'Name',
      filterType: 'text',
    },
    {
      key: 'link',
      type: 'link',
      label: 'Link'
    },
    {
      key: 'isActive',
      label: 'Active',
      type: 'renderer',
      rendererKey: 'activeRenderer',
      filterType: 'select',
      options: [
        {
          label: "Yes",
          value: "Yes"
        },
        {
          label: "No",
          value: "No"
        }
      ]
    },
    {
      key: 'actions',
      label: 'Actions',
      type: 'actions',
      actions: [
        {
          type: 'delete',
          actionClass: 'delete-action',
          icon: DeleteIcon,
          onClickAction: ({ row }) => {
            setIsDeleteModalOpen(true);
            setSelectedActionItem({ ...row });
          }
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/users');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData(SampleData.map(item => ({ ...item, logo: Logo })));
      }
    };

    fetchData();
  }, []);

  const handlePaginationChange = (event, page) => {
    console.log('>>', page);
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  useEffect(() => {
    setTableData(paginatedData);
  }, [paginatedData]);


  const handleActiveChange = (primaryKey, value, key = 'isActive', updatedValue) => {
    const updatedData = paginatedData.map((item) => {
      if (item[primaryKey] === value) {
        return {
          ...item,
          [key]: updatedValue,
        };
      }
      return item;
    });

    console.log(`[After Row Update with ${primaryKey}:${value}]`, updatedData);
    setTableData(updatedData);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#ffff',
    boxShadow: 24,
    outline: 'none',
    p: 4,
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <Table
        count={data.length}
        pagination={{
          numberOfPages: Math.ceil(SampleData.length / itemsPerPage),
          currentPage: currentPage,
          handleChange: handlePaginationChange,
        }}
        columns={columns}
        data={tableData}
        renderer={renderer}
      />
      {isDeleteModalOpen && (
        <Modal
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
              Are you sure you want to delete {selectedActionItem.name}?
            </Typography>
            <div className="d-flex justify-content-center">
              <Button onClick={handleDelete}>Delete</Button>
              <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            </div>
          </Box>
        </Modal>
      )}
    </div>);
}
