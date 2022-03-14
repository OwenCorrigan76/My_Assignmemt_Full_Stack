import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/details.json"));
db.data = { details: [] };

export const detailJsonStore = {
  async getAllDetails() {
    await db.read();
    return db.data.details;
  },

  async addDetail(venueId, detail) {
    await db.read();
    detail._id = v4();
    detail.venueid = venueId;
    db.data.details.push(detail);
    await db.write();
    return detail;
    },

   async getDetailsByVenueId(id) {
    await db.read();
    return db.data.details.filter((detail) => detail.venueid === id);
  },

  async getDetailById(id) {
    await db.read();
    return db.data.details.find((detail) => detail._id === id);
  },

 async deleteDetail(id) {
    await db.read();
    const index = db.data.details.findIndex((detail) => detail._id === id);
    db.data.details.splice(index, 1);
    await db.write();
  },

  async deleteAllDetails() {
    db.data.details = [];
    await db.write();
  },

  async updateDetail(detail, updatedDetail) {
    detail.title = updatedDetail.title;
    detail.address = updatedDetail.address;
    detail.location = updatedDetail.location;
    await db.write();
  },
};

