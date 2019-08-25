import React from 'react'
import SelectorBar from './SelectorBar'
import HeaderBar from './HeaderBar'
import CalendarSection from './CalendarSection'

import '../scss/main.scss'

const App = () => {
  return (
    <>
      <SelectorBar />
      <HeaderBar />
      <CalendarSection />
    </>
  )
}

export default App