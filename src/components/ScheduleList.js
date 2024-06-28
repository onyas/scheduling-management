import React, {
  useEffect,
  useState,
} from 'react';

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
      <CalendarComponent />
    </div>
  );
};

export default ScheduleList;