import { v4 } from "uuid";

let details = [];

export const detailMemStore = {
  async getAllDetails() {
    return details;
  },

  async addDetail(venueId, detail) {
    detail._id = v4();
    detail.venueid = venueId;
    details.push(detail);
    return detail;
  },

  async getDetailsByVenueId(id) {
    return details.filter((detail) => detail.venueid === id);
  },

  async getDetailById(id) {
    return details.find((detail) => detail._id === id);
  },

  async getVenueDetails(venueId) {
    return details.filter((detail) => detail.venueid === venueId);
  },

  async deleteDetail(id) {
    const index = details.findIndex((detail) => detail._id === id);
    details.splice(index, 1);
  },

  async deleteAllDetails() {
    details = [];
  },

  async updateDetail(detail, updatedDetail) {
    detail.title = updatedDetail.title;
    detail.artist = updatedDetail.artist;
    detail.duration = updatedDetail.duration;
  },
};



