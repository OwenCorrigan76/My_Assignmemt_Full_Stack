import { Venue } from "./venue.js";
import { detailMongoStore } from "./detail-mongo-store.js";
import {Detail} from "./detail.js";

export const venueMongoStore = {
    async getAllVenues() {
        const venues = await Venue.find().lean();
        return venues;
    },

    async getVenueById(id) {
        if (id) {
            const venue = await Venue.findOne({ _id: id }).lean();
            if (venue) {
                venue.details = await detailMongoStore.getDetailsByVenueId(venue._id);
            }
            return venue;
        }
        return null;
    },

    async addVenue(venue) {
        const newVenue = new Venue(venue);
        const venueObj = await newVenue.save();
        return this.getVenueById(venueObj._id);
    },

    async getUserVenues(id) {
        const venue = await Venue.find({ userid: id }).lean();
        return venue;
    },

    async deleteVenueById(id) {
        try {
            await Venue.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllVenues() {
        await Venue.deleteMany({});
    }
};
