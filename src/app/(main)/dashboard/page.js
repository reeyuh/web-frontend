"use client";

import Table from "@/components/table";
import React, { useState } from "react";
import Logo from "@/assets/images/logo.png";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal, Button, Box, Typography, Divider } from "@mui/material";

export default function Dashboard() {
  const [data, setData] = useState([{ name: 'user1', id: '1', link: 'https://www.google.co.in/', logo: Logo }, { name: 'user2', id: '2', link: 'https://mail.google.com/mail', logo: Logo }]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedActionItem, setSelectedActionItem] = useState({});
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
      showToolTip: true,
    },
    {
      key: 'link',
      type: 'link',
      label: 'Link'
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
            <Divider sx={{ mt: 1 }} />
            <div className="d-flex justify-content-center">
              <Button onClick={handleDelete}>Delete</Button>
              <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            </div>
          </Box>
        </Modal>
      )}
    </div>);
}
