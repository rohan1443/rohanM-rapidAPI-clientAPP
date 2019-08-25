import React from 'react'
import { combineReducers } from 'redux'
import countryReducer from './countryReducer'
import langLocreducer from './langLocReducer'
import selectedRouteReducer from './selectedRouteReducer'
import flightPriceReducer from './flightPriceReducer'
import calendarLoaderReducer from './calendarLoaderReducer'
import fetchingError from './fetchingError'


export default combineReducers({
    country: countryReducer
  , langLoc: langLocreducer
  , selectedRoute: selectedRouteReducer
  , cheapestPriceList: flightPriceReducer
  , calendarLoading: calendarLoaderReducer
  , errorData: fetchingError
})