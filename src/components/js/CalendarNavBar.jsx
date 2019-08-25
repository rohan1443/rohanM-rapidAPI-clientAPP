import React, { Component } from 'react'
import { connect } from 'react-redux'

import { selectRoute } from '../../actions'
import { COUNTRY_CODES } from '../../constants'

export class CalendarNavBar extends Component {
  state = {
    
  }

  generateRouteLabel = (source, destination) => {
    return `${COUNTRY_CODES[source]} - ${COUNTRY_CODES[destination]}`
  }
  generateRoutes = (source, destination) => {
    return { source, destination }
  }

  render() {
    const { calendarLoading } = this.props

    return (
      <div className="calendar-navbar-container">
        <button disabled={calendarLoading} className="flight-search" onClick={() => this.props.selectRoute(this.generateRoutes("Singapore", "Kualalumpur"))}>
          {this.generateRouteLabel("Singapore", "Kualalumpur")}
        </button>
        <button disabled={calendarLoading} className="flight-search" onClick={() => this.props.selectRoute(this.generateRoutes("Kualalumpur", "Singapore"))}>
          {this.generateRouteLabel("Kualalumpur", "Singapore")}
        </button>
        <button disabled={calendarLoading} className="flight-search" onClick={() => this.props.selectRoute(this.generateRoutes("Kualalumpur", "SanFransisco"))}>
          {this.generateRouteLabel("Kualalumpur", "SanFransisco")}
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({ calendarLoading }) => {
  return { calendarLoading }
}

export default connect(mapStateToProps, { selectRoute })(CalendarNavBar)