import React, { useEffect, useState } from "react";

import { message } from "antd";
import dayjs from "dayjs";

import ScheduleButton from "../components/ScheduleButton";
import ScheduleCalendar from "../components/ScheduleCalendar";
import { addData, fetchData, openDB } from "../utils/indexedDB";

const SchedulePage = () => {
  const [scheduleList, setScheduleList] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const loadUserList = async () => {
      const db = await openDB("userDB", "users");
      setUserList(await fetchData(db, "users"));
    };

    loadUserList();
  }, []);

  useEffect(() => {
    const loadScheduleList = async () => {
      const db = await openDB("scheduleDB", "scheduleList");
      setScheduleList(await fetchData(db, "scheduleList"));
    };

    loadScheduleList();
  }, []);

  const handleStartScheduling = async () => {
    const db = await openDB("userDB", "users");
    const userList = await fetchData(db, "users");
    const scheduleDB = await openDB("scheduleDB", "scheduleList");

    const currentMonth = dayjs().month(); // 获取当前月份
    const daysInMonth = dayjs().endOf("month").date(); // 获取当前月份的天数
    let schedule = [];

    for (let day = 1; day <= daysInMonth; day++) {
      for (let period = 1; period <= 2; period++) {
        const userIndex = ((day - 1) * 2 + period - 1) % userList.length;
        const user = userList[userIndex];
        const timePeriod = period === 1 ? "上午" : "下午";
        const date = dayjs().month(currentMonth).date(day).format("YYYY-MM-DD");

        schedule.push({
          type: "success",
          content: `${timePeriod}: ${user.name}`,
          date: date,
        });
      }
    }

    schedule.forEach(async (item) => {
      await addData(scheduleDB, "scheduleList", item);
    });
    message.success("排班成功");

    setScheduleList(schedule); // Update the state with the new schedule
  };

  return (
    <div>
      <ScheduleButton onSchedule={handleStartScheduling} />
      <ScheduleCalendar events={scheduleList} />
    </div>
  );
};

export default SchedulePage;
