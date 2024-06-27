// src/components/UserList.js
import React from 'react';

import {
  Button,
  Table,
} from 'antd';

const { Column } = Table;

const UserList = ({ users, deleteUser }) => {
  console.log('UserList users:', users);
  return (<div>
  <Table dataSource={users} rowKey="id">
        <Column title="名字" dataIndex="name" key="name" />
        <Column
          title="操作"
          key="action"
          render={(text, record) => (
            <Button type="danger" size="small" onClick={() => deleteUser(record.id)}>
              删除
            </Button>
          )}
        />
      </Table>
      </div>);
};

export default UserList;