"use client";

import Table from "@/components/table";
import React, { useEffect, useState } from "react";
import Logo from "@/assets/images/logo.png";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal, Button, Box, Typography, Divider, Select, MenuItem } from "@mui/material";

export default function Dashboard() {
  const [data, setData] = useState(
    [
      { name: 'user1', id: '1', link: 'https://www.google.co.in/', logo: Logo, isActive: 'Yes' },
      { name: 'user2', id: '2', link: 'https://mail.google.com/mail', logo: Logo, isActive: 'No' }
    ]
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedActionItem, setSelectedActionItem] = useState({});

  const RenderActiveColumn = ({ row, cell }) => {
    const options = [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ];

    const [activeValue, setActiveValue] = useState(cell);

    const handleChange = (event) => {
      const updatedValue = event.target.value;
      setActiveValue(updatedValue);
      const updatedRow = { ...row, active: updatedValue };
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

  const renderer = {
    activeRenderer: RenderActiveColumn,
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
    },
    {
      key: 'actions',
      label: 'Actions',
      type: 'actions',
      actions: [
        {
          type: 'edit',
          actionClass: 'edit-action',
          icon: EditIcon,
          onClickAction: () => { }
        },
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
      Dashboard
      <Table
        count={2}
        columns={columns}
        data={data}
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
