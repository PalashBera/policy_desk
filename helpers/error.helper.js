export function errorFormatter({ location, msg, param, value, nestedErrors }) {
  return {
    location: location,
    message: msg,
    param: param,
    value: value,
    nestedErrors: nestedErrors,
  };
}
