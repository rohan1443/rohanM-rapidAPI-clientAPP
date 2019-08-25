import React from 'react'

import CalendarNavBar from './CalendarNavBar'
import CalendarComponent from './CalendarComponent'

const CalendarSection = () => {

    return (
      <div className="calendar-section">
        <CalendarNavBar />
        <CalendarComponent />
      </div>
    )
  }


export default CalendarSection