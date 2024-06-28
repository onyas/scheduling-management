// UsersPage.js
import React from 'react';

import ScheduleButton from '../components/ScheduleButton';
import ScheduleList from '../components/ScheduleList';

const SchedulePage = () => {
    return (
        <div className="App">
            <ScheduleButton  />
            <ScheduleList />
        </div>
    );
};

export default SchedulePage;