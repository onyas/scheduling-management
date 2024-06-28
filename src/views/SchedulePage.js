import React, { useEffect, useState } from "react";

import { message } from "antd";
import dayjs from "dayjs";

import ScheduleButton from "../components/ScheduleButton";
import ScheduleCalendar from "../components/ScheduleCalendar";
import holidaysData from "../utils/2024.json";
import { addData, fetchData, openDB } from "../utils/indexedDB";

dayjs.locale("zh-cn");

const SchedulePage = () => {
  const [scheduleList, setScheduleList] = useState([]);
  const [userList, setUserList] = useState([]);
  const offDaysMap = new Map();
  const workDaysMap = new Map();

  holidaysData.days.forEach(({ date, name, isOffDay }) => {
    if (isOffDay) {
      offDaysMap.set(date, name);
    } else {
      workDaysMap.set(date, "补班");
    }
  });
  console.log("offDaysMap", offDaysMap);
  console.log("workDaysMap", workDaysMap);
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
    const thisMonth = scheduleList.filter(
      (event) =>
        dayjs(event.date).format("YYYY-MM") === dayjs().format("YYYY-MM")
    );
    if (thisMonth.length > 0) {
      message.error("本月已排班，请勿重复排班");
      return;
    }
    const db = await openDB("userDB", "users");
    const userList = await fetchData(db, "users");
    const scheduleDB = await openDB("scheduleDB", "scheduleList");

    const currentMonth = dayjs().month(); // 获取当前月份
    const daysInMonth = dayjs().endOf("month").date(); // 获取当前月份的天数
    let schedule = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = dayjs().month(currentMonth).date(day).day();
      const date = dayjs().month(currentMonth).date(day).format("YYYY-MM-DD");
      //如果是节假日，不排班
      if (offDaysMap.has(date)) {
        schedule.push({
          type: "success",
          content: offDaysMap.get(date),
          date: date,
        });
        continue;
      }
      //如果是周末，且不是补班日，不排班
      if ((dayOfWeek === 0 || dayOfWeek === 6) && !workDaysMap.has(date)) {
        continue;
      }
      for (let period = 1; period <= 2; period++) {
        const userIndex = ((day - 1) * 2 + period - 1) % userList.length;
        const user = userList[userIndex];
        const timePeriod = period === 1 ? "上午" : "下午";
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
