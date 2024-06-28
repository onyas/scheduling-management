// UsersPage.js
import React from 'react';

import ScheduleButton from '../components/ScheduleButton';
import ScheduleCalendar from "../components/ScheduleCalendar";

const SchedulePage = () => {
    return (
      <div className="App">
        <ScheduleButton />
        <ScheduleCalendar />
      </div>
    );
};

export default SchedulePage;