
import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
    .keys({
        email: Joi.string().email().example("homer@simpson.com").required(),
        password: Joi.string().example("secret").required(),
    })
    .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
    firstName: Joi.string().example("Bart").required(),
    lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const VenueSpec = Joi.object()
    .keys({
        title: Joi.string().required().example("Smyths"),
        vtype: Joi.string().required().example("Lovely"),
        description: Joi.string().required().example("Music"),

        userid: IdSpec,
    })
    .label("Venue");

export const VenueSpecPlus = VenueSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("VenuePlus");

export const VenueArraySpec = Joi.array().items(VenueSpecPlus).label("VenueArray");