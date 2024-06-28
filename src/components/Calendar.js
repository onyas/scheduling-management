import React, {
  useEffect,
  useState,
} from 'react';

import {
  Badge,
  Calendar,
} from 'antd';
import dayjs from 'dayjs'; // 确保已经安装了dayjs

import {
  fetchData,
  openDB,
} from '../utils/indexedDB';

const App = () => {
  const dbName = 'scheduleDB';
  const storeName = 'scheduleList';
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
        const db = await openDB(dbName, storeName);
        const userData = await fetchData(db, storeName);
        const events = userData.map(user => ({
        type: 'success', // 假设所有事件类型都是'success'
        content: user.name, // 事件内容设置为用户姓名
      }));
      setUserEvents(events);
    };

    loadEvents();
  }, []);

  const getListData = (value: dayjs.Dayjs) => {
    return userEvents
      .filter(event => dayjs(event.date).isSame(value, 'day'))
      .map(event => ({ type: event.type, content: event.content }));
  };

  const dateCellRender = (value: dayjs.Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
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

  return <Calendar cellRender={cellRender} />;
};

export default App;