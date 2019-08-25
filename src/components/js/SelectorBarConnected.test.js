import React from 'react'
import renderer from 'react-test-renderer';
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import sinon from 'sinon'
import { mount } from 'enzyme'

import SelectorBar from './SelectorBar'

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
   wrapper = renderer.create(
      <Provider store={store}>
        <SelectorBar {...props} />
      </Provider>).toJSON()

    expect(wrapper).toMatchSnapshot()
  })

  test("testing reducer", () => {
    wrapper = mount(
      <Provider store={store}>
        <SelectorBar {...props} />
      </Provider>)

    const propsFromReduxCountryLocale = wrapper.find(SelectorBar).props()

    expect(propsFromReduxCountryLocale).toEqual({
        fetchCountry
      , fetchLangLoc
    })
  })
})

