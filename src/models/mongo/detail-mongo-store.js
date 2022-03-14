import { Detail } from "./detail.js";

export const detailMongoStore = {
    async getDetailsByVenueId(id) {
        const details = await Detail.find({ venueid: id }).lean();
        return details;
    },
};
