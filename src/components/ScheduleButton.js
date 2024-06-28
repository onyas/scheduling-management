import React from "react";

import { Button } from "antd";

const ScheduleButton = ({ onSchedule }) => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Button type="primary" onClick={onSchedule}>
        开始排班
      </Button>
    </div>
  );
};

export default ScheduleButton;
