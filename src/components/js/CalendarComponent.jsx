import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import Calendar from 'react-calendar'
import _ from 'lodash'
import Loader from 'react-loader-spinner'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import { fetchCurrentMonthFlighPrices, loadCalendar } from '../../actions'
import { COUNTRY_CODES, LOADING_WAIT } from '../../constants'


const date = new Date()
    , currentDate = moment(date).format('YYYY-MM-DD')
    , endDate = moment(date).add(29, 'days').format('YYYY-MM-DD')
    , fetchCalendarResource = (selectedRoute, langLoc, country) => {
      const { source, destination } = selectedRoute
      return {
        country
        , currency: "USD"
        , locale: langLoc
        , origin: `${COUNTRY_CODES[source]}-sky`
        , destination: `${COUNTRY_CODES[destination]}-sky`
        , adults: "1"
        , startDate: currentDate
        , lastDate: endDate
      }
    }

class CalendarComponent extends Component {
  state = {
    showCalendar: false
    , priceListArray: []
    , showLoader: false
    , currentRoute: null
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { selectedRoute, langLoc, country, cheapestPriceList } = nextProps
    if (!selectedRoute || !langLoc || !country) {
      return ({ showCalendar: false })
    } else {
      if (!_.isEqual(prevState.currentRoute, selectedRoute)) {
        const params = fetchCalendarResource(selectedRoute, langLoc, country)
        nextProps.fetchCurrentMonthFlighPrices(params)
        nextProps.loadCalendar(true)
        return ({ showCalendar: true, showLoader: true, currentRoute: selectedRoute })
      } else {
        nextProps.loadCalendar(false)
        return ({ priceListArray: cheapestPriceList, showLoader: false })
      }
    }
  }


  render() {
    const { showCalendar, priceListArray, showLoader } = this.state
        , { selectedRoute, errorData } = this.props
        , tileContent = ({ date, view }) => {
            const dateFormat = moment(date).format("YYYY-MM-DD")
            if (dateFormat >= currentDate && dateFormat <= endDate) {
              if (showLoader) {
                return (<div>
                          <Loader 
                            type="Puff"
                            color="#00BFFF"
                            height={25}
                            width={25}
                          />
                        </div>)
              } else {
                if(priceListArray.length > 0) {
                  const priceToDate = priceListArray.find(dateItem => {
                    return dateItem.date === dateFormat
                  })
                  return (<div>{priceToDate.price ? `${priceToDate.price} $` : "NA"}</div>)
                } else return (<div>Check Network. RETRY!!</div>)
                
              }
            }
          }
        , tileDisabled = ({activeStartDate, date, view}) => {
          const dateFormat = moment(date).format("YYYY-MM-DD")
          if(dateFormat >= currentDate && dateFormat <= endDate) {
            if(showLoader) {
              return date
            } else {
              return null
            }
          }
        }

    return (
      <div className="calendar-component">
        {!errorData ? (
          showCalendar ?
            (<>
              <div className="route-details">
                <div className="route origin">{selectedRoute && `Source: ${selectedRoute.source.toUpperCase()}`} </div>
                <div className="route destination">{selectedRoute && `Destination: ${selectedRoute.destination.toUpperCase()}`}</div>
                <div className="route"> {`Start Date: ${currentDate}`}</div>
                <div className="route"> {`End Date: ${endDate}`}</div>            
              </div>
              <div className="calendar-comp">
                {showLoader && (<div>{LOADING_WAIT.toUpperCase()}</div>)}
                <Calendar
                  className="price-list-calendar"
                  tileClassName="calendar-layout"
                  activeStartDate={date}
                  minDate={new Date(currentDate)}
                  maxDate={new Date(endDate)}
                  tileContent={tileContent}
                  tileDisabled={tileDisabled}
                />
              </div>
            </>) : <div className="route-message">Please select a Route</div>
        ) : (
            <div className="error-content">
              <div className="error-message">Something went wrong... PLEASE REFRESH</div>
              <div className="error-data">{errorData}</div>
            </div>
          )
        }
      </div>
    )
  }
}

CalendarComponent.propTypes = {
    selectedRoute: PropTypes.object
  , langLoc: PropTypes.string
  , country: PropTypes.string
  , cheapestPriceList: PropTypes.array
  , errorData: PropTypes.array
}

const mapStateToProps = ({ selectedRoute, langLoc, country, cheapestPriceList, errorData }) => {
  return { selectedRoute, langLoc, country, cheapestPriceList, errorData }
}

export default connect(mapStateToProps, { fetchCurrentMonthFlighPrices, loadCalendar })(CalendarComponent)
