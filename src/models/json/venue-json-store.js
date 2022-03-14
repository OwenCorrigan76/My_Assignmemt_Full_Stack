import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";
import { detailJsonStore } from "./detail-json-store.js";

const db = new Low(new JSONFile("./src/models/json/venues.json"));
db.data = { venues: [] };

export const venueJsonStore = {
  async getAllVenues() {
    await db.read();
    return db.data.venues;
  },

  async addVenue(venue) {
    await db.read();
    venue._id = v4();
    db.data.venues.push(venue);
    await db.write();
    return venue;
  },

   async getVenueById(id) {
     await db.read();
     let list = db.data.venues.find((venue) => venue._id === id);
     if (list) {
       list.details = await detailJsonStore.getDetailsByVenueId(list._id);
     } else {
       list = null;
     }
     return list;
   },

  async getUserVenues(userid) {
    await db.read();
    return db.data.venues.filter((venue) => venue.userid === userid);
  },

  async deleteVenueById(id) {
    await db.read();
    const index = db.data.venues.findIndex((venue) => venue._id === id);
    if (index !== -1) db.data.venues.splice(index, 1);
    await db.write();
  },

  async deleteAllVenues() {
    db.data.venues = [];
    await db.write();
  },
};
