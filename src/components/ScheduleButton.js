import React from 'react';

import { Button } from 'antd';

import {
  fetchData,
  openDB,
} from '../utils/indexedDB';

const ScheduleButton = () => {
  const handleStartScheduling = async () => {
    const db = await openDB("userDB", "users");
    const userList = await fetchData(db, "users");
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