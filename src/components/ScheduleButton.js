import React from "react";

import { Button } from "antd";

const ScheduleButton = ({ onSchedule, onClean }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Button type="primary" onClick={onSchedule}>
        开始排班
      </Button>

      <Button type="primary" style={{ marginLeft: "10px" }} onClick={onClean}>
        清理当月排班
      </Button>
    </div>
  );
};

export default ScheduleButton;
