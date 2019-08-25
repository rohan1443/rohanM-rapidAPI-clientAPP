export default (country = null, action) => {
  switch (action.type) {
    case "FETCH_COUNTRY":
      return action.payload
    default:
      return country
  }
}