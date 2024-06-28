import "dayjs/locale/zh-cn";

import React from "react";

import { Badge, Calendar, ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";

dayjs.locale("zh-cn");
const ScheduleCalendar = ({ events }) => {
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

  return (
    <ConfigProvider locale={zhCN}>
      <Calendar cellRender={cellRender} />
    </ConfigProvider>
  );
};

export default ScheduleCalendar;
