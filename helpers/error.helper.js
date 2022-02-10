export function errorFormatter({ location, msg, param, value, nestedErrors }) {
  return {
    location: location,
    message: msg,
    param: param,
    value: value,
    nestedErrors: nestedErrors
  };
};

export function notFoundError(name, id) {
  return {
    location: 'params',
    message: `${name} has not been found.`,
    param: 'id',
    value: id
  };
};
