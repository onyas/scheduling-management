import { useEffect, useState } from "react";

import { message } from "antd";
import dayjs from "dayjs";

import ScheduleButton from "../components/ScheduleButton";
import ScheduleCalendar from "../components/ScheduleCalendar";
import holidaysData from "../utils/2024.json";
import { addData, deleteById, fetchData, openDB } from "../utils/indexedDB";

dayjs.locale("zh-cn");

const SchedulePage = () => {
  const [scheduleList, setScheduleList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));
  const [selectedItem, setSelectedItem] = useState([]); // 选中的日程

  const offDaysMap = new Map();
  const workDaysMap = new Map();

  holidaysData.days.forEach(({ date, name, isOffDay }) => {
    if (isOffDay) {
      offDaysMap.set(date, name);
    } else {
      workDaysMap.set(date, "补班");
    }
  });

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
        dayjs(event.date).format("YYYY-MM") ===
        dayjs(selectedMonth).format("YYYY-MM")
    );
    if (thisMonth.length > 0) {
      message.error("本月已排班，请勿重复排班");
      return;
    }
    const db = await openDB("userDB", "users");
    const userList = await fetchData(db, "users");
    if (userList.length === 0) {
      message.error("请先添加人员");
      return;
    }
    const scheduleDB = await openDB("scheduleDB", "scheduleList");

    const currentMonth = dayjs(selectedMonth).month(); // 获取当前月份
    const daysInMonth = dayjs(selectedMonth).endOf("month").date(); // 获取当前月份的天数
    let schedule = [];
    let workDay = 1;
    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = dayjs().month(currentMonth).date(day).day();
      const date = dayjs().month(currentMonth).date(day).format("YYYY-MM-DD");
      //如果是节假日，不排班
      if (offDaysMap.has(date)) {
        schedule.push({
          type: "error",
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
        const userIndex = ((workDay - 1) * 2 + period - 1) % userList.length;
        const user = userList[userIndex];
        const timePeriod = period === 1 ? "上午" : "下午";
        schedule.push({
          type: "success",
          content: `${timePeriod}: ${user.name}`,
          date: date,
        });
      }
      workDay++;
    }

    schedule.forEach(async (item) => {
      await addData(scheduleDB, "scheduleList", item);
    });
    message.success("排班成功");

    setScheduleList([...scheduleList, ...schedule]); // Update the state with the new schedule
  };

  const handleClean = async () => {
    // 获取当前月份的第一天和最后一天
    const currentMonthStart = dayjs(selectedMonth)
      .startOf("month")
      .format("YYYY-MM-DD");
    const currentMonthEnd = dayjs(selectedMonth)
      .endOf("month")
      .format("YYYY-MM-DD");

    const db = await openDB("scheduleDB", "scheduleList");
    const scheduleInDB = await fetchData(db, "scheduleList");
    const idsToDelete = scheduleInDB
      .filter(
        (event) =>
          dayjs(event.date).isAfter(currentMonthStart) ||
          dayjs(event.date).isBefore(currentMonthEnd)
      )
      .map((event) => event.id);

    idsToDelete.forEach(async (id) => {
      await deleteById(db, "scheduleList", id);
    });

    // 筛选出不在当前月份的排班数据
    const filteredScheduleList = scheduleList.filter(
      (event) =>
        dayjs(event.date).isBefore(currentMonthStart) ||
        dayjs(event.date).isAfter(currentMonthEnd)
    );

    // 更新状态，只保留非当前月份的排班数据
    setScheduleList(filteredScheduleList);
    message.success("清理成功");
  };

  const getDaysSchedule = (value) => {
    return scheduleList
      .filter((event) => event.date === value.format("YYYY-MM-DD"))
      .map((event) => ({
        id: event.id,
        type: event.type,
        content: event.content,
        date: event.date,
      }));
  };

  const handleSelectMonth = (month) => {
    console.log("selected month", month);
    setSelectedMonth(month);

    setSelectedItem(getDaysSchedule(month));
  };

  const handleItemDeleted = async (itemId, date) => {
    console.log("schedule deleted", itemId, date);
    const db = await openDB("scheduleDB", "scheduleList");
    await deleteById(db, "scheduleList", itemId);
    setScheduleList(await fetchData(db, "scheduleList"));
    setSelectedItem(getDaysSchedule(dayjs(date)));
  };

  const handleScheduleAdded = async (schedule) => {
    console.log("schedule added", schedule);
    const db = await openDB("scheduleDB", "scheduleList");
    await addData(db, "scheduleList", schedule);
    setScheduleList(await fetchData(db, "scheduleList"));
    setSelectedItem(getDaysSchedule(dayjs(schedule.date)));
  };

  return (
    <div>
      <ScheduleButton
        onSchedule={handleStartScheduling}
        onClean={handleClean}
      />
      <ScheduleCalendar
        events={scheduleList}
        users={userList}
        selectedItem={selectedItem}
        onMonthChange={handleSelectMonth}
        onItemDeleted={handleItemDeleted}
        onScheduleAdded={handleScheduleAdded}
      />
    </div>
  );
};

export default SchedulePage;
