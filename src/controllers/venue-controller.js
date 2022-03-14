import { db } from "../models/db.js";

export const venueController = {
  index: {
    handler: async function (request, h) {
      const venue = await db.venueStore.getVenueById(request.params.id);
      const viewData = {
        title: "Venue",
        venue: venue,
      };
      return h.view("venue-view", viewData);
    },
  },
};
