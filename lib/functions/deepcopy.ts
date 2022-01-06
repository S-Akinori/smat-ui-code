const deepCopy = (obj: Object) => {
  return JSON.parse(JSON.stringify(obj));
}
export default deepCopy