const { idSchema, nameSchema, saleProductsSchema } = require('./schemas');
// const { travelModel, driverModel, productsModel } = require('../../models');
// const { travelModel, driverModel } = require('../../models');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  
  return { type: null, message: '' };
};

const validateName = (name) => {
  const { error } = nameSchema.validate({ name });
  if (error) {
    const { message, type } = error.details[0];
    return { type: type === 'any.required' ? 'REQUIRED_NAME' : 'MIN_NAME_CHAR', message };
  }

  return { type: null, message: '' };  
};

const validateSales = (salesProducts) => {
  const { error } = saleProductsSchema.validate(salesProducts);
  if (error) {
    let { message, type } = error.details[0];
    [, message] = message.split('.');
    message = '"'.concat(message);
    if (type === 'any.required') {
      type = 'IS_REQUIRED';
    }
    if (type === 'number.min') {
      type = 'INVALID_VALUE';
    }
    return { type, message };
  }
  
  return { type: null, message: '' };
};

// const validateNewPassenger = (name, email, phone) => {
//   const { error } = addPassengerSchema
//     .validate({ name, email, phone });
//   if (error) return { type: 'INVALID_VALUE', message: error.message };
  
//   return { type: null, message: '' };
// };

// const validateRequestTravelSchema = (passengerId, startingAddress, endingAddress, waypoints) => {
//   const { error } = addRequestTravelSchema
//     .validate({ passengerId, startingAddress, endingAddress, waypoints });
//   if (error) return { type: 'INVALID_VALUE', message: error.message };

//   return { type: null, message: '' };
// };

// const validateInputValues = async ({ travelId, driverId }) => {
//   /* Valida se travelId existe */
//   const travel = await travelModel.findById(travelId);
//   if (!travel) return { type: 'TRAVEL_NOT_FOUND', message: 'travel id not found' };

//   /* Valida se driverId existe */
//   const driver = await driverModel.findById(driverId);
//   if (!driver) return { type: 'DRIVER_NOT_FOUND', message: 'driver id not found' };

//   // const products = await productsModel.findById()

//   return { type: null, message: '' };
// };

// const validateAlreadyDriver = async (travelId) => {
//   const travel = await travelModel.findById(travelId);

//   if (travel && travel.driverId) {
//     return { type: 'TRAVEL_CONFLICT', message: 'travel already assigned' };
//   }

//   return { type: null, message: '' };
// };

module.exports = {
  validateId,
  validateName,
  validateSales,
};