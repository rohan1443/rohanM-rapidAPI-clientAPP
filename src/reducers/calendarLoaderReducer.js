
import { CALENDAR_LOADING_STATUS } from '../constants'

export default (loading = false, action) => {
  switch(action.type) {
    case CALENDAR_LOADING_STATUS:
      return action.payload;
    default:
      return loading
  }
}