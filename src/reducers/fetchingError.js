import { FETCHING_ERROR } from '../constants'

export default (errorStatus = null, action) => {
  switch(action.type) {
    case FETCHING_ERROR:
      return action.payload;
    default:
      return null
  }
}