import React, { Component } from 'react'
import { fetchCountry, fetchLangLoc } from '../../actions'
import { connect } from 'react-redux'


export class SelectorBar extends Component {
  componentDidMount() {
    this.props.fetchCountry('US')
    this.props.fetchLangLoc('EN-US')
  }

  render() {
    const { country, langLoc } = this.props
    return (
      <div className="selection-bar-container">
        <div className="selection-bar-content">
          <div className="selector country"> {country} </div>
          <div className="selector langloc"> {langLoc} </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ country, langLoc }) => {
  return { country, langLoc }
}

export default connect(mapStateToProps, { fetchCountry, fetchLangLoc })(SelectorBar)