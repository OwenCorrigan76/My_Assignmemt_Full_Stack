import {userMemStore} from "./mem/user-mem-store.js";
import {venueMemStore} from "./mem/venue-mem-store.js";
// import {detailMemStore} from "./mem/detail-mem-store.js";
import {userJsonStore} from "./json/user-json-store.js";
import {venueJsonStore} from "./json/venue-json-store.js";
// import {detailJsonStore} from "./json/detail-json-store.js";
import {userMongoStore} from "./mongo/user-mongo-store.js";
import {venueMongoStore} from "./mongo/venue-mongo-store.js";
import {detailMongoStore} from "./mongo/detail-mongo-store.js";
import {connectMongo} from "./mongo/connect.js";

export const db = {
    userStore: null,
    venueStore: null,
  //  detailStore: null,
    init(storeType) {
        switch (storeType) {
            case "json":
                this.userStore = userJsonStore;
                this.venueStore = venueJsonStore;
             //   this.detailStore = detailJsonStore;
                break;
            case "mongo":
                this.userStore = userMongoStore;
               // this.detailStore = detailMongoStore;
                this.venueStore = venueMongoStore
                connectMongo();
                break;
            default:
                this.userStore = userMemStore;
             //   this.detailStore = detailMemStore;
                this.venueStore = venueMemStore;
        }
    },
};