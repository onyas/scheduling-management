import {
  Button,
  message,
} from 'antd';
import dayjs from 'dayjs';

import {
  addData,
  fetchData,
  openDB,
} from '../utils/indexedDB';

const ScheduleButton = () => {
  
  const handleStartScheduling = async () => {
    const db = await openDB("userDB", "users");
    const userList = await fetchData(db, "users");
    const scheduleDB = await openDB("scheduleDB", "scheduleList");

    const currentMonth = dayjs().month(); // 获取当前月份
    const daysInMonth = dayjs().endOf('month').date(); // 获取当前月份的天数
    let schedule = [];

    for (let day = 1; day <= daysInMonth; day++) {
      // 为每天创建两个时间段：上午和下午
      for (let period = 1; period <= 2; period++) {
        // 计算用户索引，确保不会超出用户数组长度
        const userIndex = ((day - 1) * 2 + period - 1) % userList.length;
        const user = userList[userIndex];
        const timePeriod = period === 1 ? '上午' : '下午';
        const date = dayjs().month(currentMonth).date(day).format('YYYY-MM-DD');

        schedule.push({
          title: `${timePeriod}: ${user.name}`,
          date: date
        });
      }
    }

    schedule.forEach(async (item) => {
      await addData(scheduleDB, "scheduleList", item);
    });
    message.success('排班成功');
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