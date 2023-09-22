import Table from "@/components/table";
import React from "react";
import Logo from "@/assets/images/logo.png";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Dashboard() {
  const columns = [
    {
      key: 'logo',
      label: 'Logo',
      type: 'file',
    },
    {
      key: 'id',
      label: 'Id'
    },
    {
      key: 'name',
      label: 'Name'
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
        },
      ],
    },
  ];
  return (
    <div>
      Dashboard
      <Table
        count={2}
        columns={columns}
        data={[{ name: 'pm', id: '1', link: 'https://www.google.co.in/', logo: Logo }, { name: 'sm', id: '2', link: 'https://mail.google.com/mail', logo: Logo }]}
      />
    </div>);
}
