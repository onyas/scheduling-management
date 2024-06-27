// src/components/UserList.js
import React from 'react';

import {
  Button,
  Table,
} from 'antd';

const UserList = ({ users, deleteUser }) => {
  console.log('UserList users:', users);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => deleteUser(record.id)}>Delete</Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={users} rowKey={record => record.id} />;
};

export default UserList;