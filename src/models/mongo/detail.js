import Mongoose from "mongoose";

const { Schema } = Mongoose;

const detailSchema = new Schema({
    title: String,
    address: String,
    location: Number,
    venueid: {
        type: Schema.Types.ObjectId,
        ref: "Venue",
    },
});

export const Detail = Mongoose.model("Detail", detailSchema);