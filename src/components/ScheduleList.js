import React, {
  useEffect,
  useState,
} from 'react';

import { List } from 'antd';

import {
  fetchData,
  openDB,
} from '../utils/indexedDB';
import CalendarComponent from './Calendar';

const ScheduleList = () => {
  const dbName = 'scheduleDB';
  const storeName = 'scheduleList';
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    checkAndLoadSchedules();
  }, []);

  const checkAndLoadSchedules = async () => {
    const db = await openDB(dbName, storeName);
    setSchedules(await fetchData(db, storeName));
  };

  return (
    <div>
      {schedules.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={schedules}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      ) : (
        <CalendarComponent />
      )}
    </div>
  );
};

export default ScheduleList;