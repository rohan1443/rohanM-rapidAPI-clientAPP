import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'

import { CalendarNavBar } from './CalendarNavBar'

describe("Unit testing for Calendar Nav unconnected component", () => {
  
  test("snapshot test for the CalendarNavBar component", () => {
    const wrapper = renderer.create(<CalendarNavBar />).toJSON

    expect(wrapper).toMatchSnapshot()
  })

})