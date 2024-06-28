import React, {
  useEffect,
  useState,
} from 'react';

import {
  Avatar,
  List,
} from 'antd';

import {
  fetchData,
  openDB,
} from './utils/indexedDB';

const ScheduleList = () => {
    const dbName = 'userDB';
    const storeName = 'scheduleList';
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    checkAndLoadSchedules();
  }, []);

  const checkAndLoadSchedules = async () => {
    const db = await openDB(dbName,storeName);
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
                avatar={<Avatar src={item.avatar} />}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      ) : (
        <div>当前没有排班数据，只展示月历</div>
      )}
    </div>
  );
};

export default ScheduleList;