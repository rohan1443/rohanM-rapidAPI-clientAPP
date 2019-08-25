import { FETCH_CHEAPEST_PRICE } from '../constants'

export default (priceList = [], action) => {
  switch (action.type) {
    case FETCH_CHEAPEST_PRICE:
      return [...action.payload]
    default:
      return priceList
    }
}