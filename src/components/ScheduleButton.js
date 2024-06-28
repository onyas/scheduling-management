import React, { useState } from 'react';

import { Button } from 'antd';

import {
  fetchUsers,
  openDB,
} from './utils/indexedDB';

const ScheduleButton = () => {
    const dbName = 'userDB';
    const storeName = 'users';
  const [users, setUsers] = useState([]);


  const handleStartScheduling = async () => {
    const db = await openDB(dbName,storeName);
    setUsers(await fetchUsers(db, storeName));
  };

  return (
    <div>
      <Button type="primary" onClick={handleStartScheduling}>
        开始排班
      </Button>
      {/* 月历组件，根据用户数据展示 */}
    </div>
  );
};

export default ScheduleButton;