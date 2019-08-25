import axios from 'axios'
import { FETCH_COUNTRY, FETCH_LANGLOC, SELECT_ROUTE, FETCH_CHEAPEST_PRICE, CALENDAR_LOADING_STATUS, FETCHING_ERROR } from '../constants'

export const fetchCountry = (country) => {
  return {
      type: FETCH_COUNTRY
    , payload: country
  }
}

export const fetchLangLoc = (langloc) => {
  return {
      type: FETCH_LANGLOC
    , payload: langloc
  }
}

export const selectRoute = (route) => {
  return {
      type: SELECT_ROUTE
    , payload: route
  }
}

export const fetchCurrentMonthFlighPrices = params => async (dispatch, getState) => {
  try {
    const response = await axios.get('http://localhost:3001/', { params })

    dispatch({
        type: FETCH_CHEAPEST_PRICE
      , payload: response.data.mappedResult || []
    })
  } catch (error) {
    dispatch({
        type: FETCHING_ERROR
      , payload: []
    })
  }
}

  export const loadCalendar = (status) => {
      return {
        type: CALENDAR_LOADING_STATUS
      , payload: status
      }
  }

