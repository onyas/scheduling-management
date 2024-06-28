import "dayjs/locale/zh-cn";

import React, { useState } from "react";

import { Badge, Calendar, ConfigProvider, Modal } from "antd";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";

import ScheduleForm from "./ScheduleForm";
import ScheduleList from "./ScheduleList";

dayjs.locale("zh-cn");
const ScheduleCalendar = ({
  events,
  users,
  selectedItem,
  onMonthChange,
  onItemDeleted,
  onScheduleAdded,
}) => {
  const [visible, setVisible] = useState(false); // 控制 popup 是否可见
  const [selectedDate, setSelectedDate] = useState(null); // 存储选中的日期
  const getDaysSchedule = (value) => {
    return events
      .filter((event) => event.date === value.format("YYYY-MM-DD"))
      .map((event) => ({
        id: event.id,
        type: event.type,
        content: event.content,
      }));
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
    setVisible(true); // 显示 popup
    setSelectedDate(value);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Calendar
        cellRender={cellRender}
        onPanelChange={handleMonthChange} // 当面板（年/月切换）变化时调用
        onSelect={handleMonthChange}
      />
      <Modal
        title={`重新排班`}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <div>
          <ScheduleForm
            users={users}
            onScheduleAdded={onScheduleAdded}
            selectedDate={selectedDate}
          />
          <ScheduleList
            scheduleList={selectedItem}
            onScheduleItemDelete={onItemDeleted}
          />
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default ScheduleCalendar;
