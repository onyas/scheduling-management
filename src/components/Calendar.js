import 'dayjs/locale/zh-cn';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Badge,
  Calendar,
  ConfigProvider,
} from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import {
  fetchData,
  openDB,
} from '../utils/indexedDB';

dayjs.locale('zh-cn');

const ScheduleCalendar = () => {
  const dbName = 'scheduleDB';
  const storeName = 'scheduleList';
  const [userEvents, setUserEvents] = useState([]);
  const [locale] = useState(zhCN);


  useEffect(() => {
    const loadEvents = async () => {
        const db = await openDB(dbName, storeName);
        const userData = await fetchData(db, storeName);
        console.log("scheduleList data:",userData);
        const events = userData.map(schedule => ({
        type: 'success', 
        content: schedule.title, 
        date: schedule.date
      }));
      console.log("events",events);
      setUserEvents(events);
    };

    loadEvents();
  }, []);

  const getListData = (value: dayjs.Dayjs) => {
    return userEvents
      .filter(event => event.date === value.format('YYYY-MM-DD'))
      .map(event => ({ type: event.type, content: event.content }));
  };

  const dateCellRender = (value: dayjs.Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item,index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    // 这里可以添加其他类型的cell渲染逻辑
    return info.originNode;
  };

  return  <ConfigProvider locale={locale}>
            <Calendar cellRender={cellRender} />
            </ConfigProvider>;
};

export default ScheduleCalendar;