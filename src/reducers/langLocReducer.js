export default (langLoc = null, action) => {
  switch (action.type) {
    case "FETCH_LANGLOC":
      return action.payload;
    default:
      return langLoc
  }
}