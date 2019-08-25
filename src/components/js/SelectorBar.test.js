import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer';
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import sinon from 'sinon'

import {SelectorBar} from './SelectorBar'


const mockStore = configureMockStore([thunk])

describe("SelectorBar React component testing", () => {
  let store, wrapper, fetchCountry, fetchLangLoc, props

  beforeEach(() => {
    store = mockStore({})
    props =  {
      fetchCountry: () => {}
    , fetchLangLoc: () => {}
  }
  fetchCountry = sinon.stub(props, 'fetchCountry')
  fetchLangLoc = sinon.stub(props, 'fetchLangLoc')
  });

  afterEach(() => {
    fetchCountry.reset()
    fetchLangLoc.reset()
  })

  test("SelectorBar componenet rendered correctly without crashing", () => {
    const selectorBarTree = renderer.create(
        <SelectorBar {...props} />).toJSON()

    expect(selectorBarTree).toMatchSnapshot()
  })

  test("fetchCountry funtion called on componentDidMount to fetch the default country", () => {
    wrapper = shallow(<SelectorBar {...props} />)
    
    expect(fetchCountry.calledOnce).toBe(true)
  })

  test("fetchLangLoc funtion called on componentDidMount to fetch langloc locale", () => {
    wrapper = shallow(<SelectorBar {...props} />)

    expect(fetchLangLoc.calledOnce).toBe(true)
  })

  test("verify props content being passed to the default country and locale", () => {
    wrapper = shallow(<SelectorBar {...props} /> )
    
    wrapper.setProps({country: 'US', langLoc: 'en-us'})

    expect(wrapper.find(".country").text()).toEqual(' US ')
    expect(wrapper.find(".langloc").text()).toEqual(' en-us ')
  })

})