import "dayjs/locale/zh-cn";

import React from "react";

import { Badge, Calendar, ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";

dayjs.locale("zh-cn");
const ScheduleCalendar = ({ events, onMonthChange }) => {
  const getDaysSchedule = (value) => {
    return events
      .filter((event) => event.date === value.format("YYYY-MM-DD"))
      .map((event) => ({ type: event.type, content: event.content }));
  };

  const dateCellRender = (value) => {
    const onCallToday = getDaysSchedule(value);
    return (
      <ul className="events">
        {onCallToday.map((item, index) => (
          <Badge status={item.type} text={item.content} />
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };
  const handleMonthChange = (value) => {
    // 通知父组件月份变化，value 格式为 YYYY-MM
    onMonthChange(value);
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Calendar
        cellRender={cellRender}
        onPanelChange={handleMonthChange} // 当面板（年/月切换）变化时调用
        onSelect={handleMonthChange}
      />
    </ConfigProvider>
  );
};

export default ScheduleCalendar;
