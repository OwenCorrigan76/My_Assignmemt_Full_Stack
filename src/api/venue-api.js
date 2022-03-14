import Boom from "@hapi/boom";
import { VenueSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const venueApi = {
    find: {
        auth: false,
        handler: async function (request, h) {
            try {
                const venues = await db.venueStore.getAllVenues();
                return venues;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

    findOne: {
        auth: false,
        async handler(request) {
            try {
                const venue = await db.venueStore.getVenueById(request.params.id);
                if (!venue) {
                    return Boom.notFound("No Venue with this id");
                }
                return venue;
            } catch (err) {
                return Boom.serverUnavailable("No Venue with this id");
            }
        },
    },

    create: {
        auth: false,
        handler: async function (request, h) {
            try {
                const venue = request.payload;
                const newVenue= await db.venueStore.addVenue(venue);
                if (newVenue) {
                    return h.response(newVenue).code(201);
                }
                return Boom.badImplementation("error creating venue");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },

    deleteOne: {
        auth: false,
        handler: async function (request, h) {
            try {
                const venue = await db.venueStore.getVenueById(request.params.id);
                if (!venue) {
                    return Boom.notFound("No Venue with this id");
                }
                await db.venueStore.deleteVenueById(venue._id);
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("No Venue with this id");
            }
        },
    },

    deleteAll: {
        auth: false,
        handler: async function (request, h) {
            try {
                await db.venueStore.deleteAllVenues();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
};