import Joi from "joi";

export const UserSpec = { // validation at signup
    firstName: Joi.string().required(), // string needed
    lastName: Joi.string().required(),
    email: Joi.string().email().required(), // email address needed
    password: Joi.string().required(), 
  };

  export const UserCredentialsSpec = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };
  
  export const VenueSpec = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };
  
 
  