// src/utils/errorMap.js

const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  INVALID_VALUE: 422,
  INVALID_NAME: 404,
  DRIVER_NOT_FOUND: 404,
  TRAVEL_CONFLICT: 409,
  REQUIRED_NAME: 400,
  MIN_NAME_CHAR: 422,
  IS_REQUIRED: 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};