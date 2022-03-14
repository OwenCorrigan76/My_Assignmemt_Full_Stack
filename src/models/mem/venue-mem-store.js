import { v4 } from "uuid";
import { detailMemStore } from "./detail-mem-store.js";

let venues = [];

export const venueMemStore = {
  async getAllVenues() {
    return venues;
  },

  async addVenue(venue) {
    venue._id = v4();
    venues.push(venue);
    return venue;
  },

  async getVenueById(id) {
    const list = venues.find((venue) => venue._id === id);
    if (list) {
      list.details = await venueMemStore.getDetailsByVenueId(list._id);
      return list;
    }
    return null;
  },

  async deleteVenueById(id) {
    const index = venues.findIndex((venue) => venue._id === id);
    if (index !== -1) venues.splice(index, 1);
  },

  async getUserVenues(userid) {
    return venues.filter((venue) => venue.userid === userid);
  },

  async deleteAllVenues() {
    venues = [];
  },
};
