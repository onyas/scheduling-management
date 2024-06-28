// src/components/UserList.js
import React from "react";

import { Button, Table } from "antd";

const { Column } = Table;

const ScheduleList = ({ scheduleList, onScheduleItemDelete }) => {
  console.log("scheduleList users:", scheduleList);
  return (
    <div>
      <Table dataSource={scheduleList} rowKey="id">
        <Column title="值班" dataIndex="content" key="content" />
        <Column
          title="操作"
          key="action"
          render={(text, record) => (
            <Button
              type="danger"
              size="small"
              onClick={() => onScheduleItemDelete(record.id, record.date)}>
              删除
            </Button>
          )}
        />
      </Table>
    </div>
  );
};

export default ScheduleList;
