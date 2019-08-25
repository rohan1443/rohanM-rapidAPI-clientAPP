import React from 'react'
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'

import HeaderBar from './HeaderBar'

describe("Component testing for Header Bar", () => {
  
  test("matching snapshot", () => {
    const wrapper = renderer.create(<HeaderBar />).toJSON()

    expect(wrapper).toMatchSnapshot()
  })

  test("verifying header text has appeared", () => {
  const wrapper = shallow(<HeaderBar />)

  expect(wrapper.find('.header-content').text()).toEqual("CHEAP TAKEOFFS")
  })
})