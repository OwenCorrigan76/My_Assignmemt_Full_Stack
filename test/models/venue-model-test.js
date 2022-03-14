import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testVenues, club } from "../fixtures.js";

suite("Venue Model tests", () => {

  setup(async () => {
    db.init("json");
    await db.venueStore.deleteAllVenues();
    for (let i = 0; i < testVenues.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testVenues[i] = await db.venueStore.addVenue(testVenues[i]);
    }
  });

  test("create a venue", async () => {
    const venue = await db.venueStore.addVenue(club);
    assert.equal(club, venue);
    assert.isDefined(venue._id);
  });

  test("delete all venues", async () => {
    let returnedVenues = await db.venueStore.getAllVenues();
    assert.equal(returnedVenues.length, 3);
    await db.venueStore.deleteAllVenues();
    returnedVenues = await db.venueStore.getAllVenues();
    assert.equal(returnedVenues.length, 0);
  });

  test("get a venue - success", async () => {
    const venue = await db.venueStore.addVenue(club);
    const returnedPlaylist = await db.venueStore.getVenueById(venue._id);
    assert.equal(club, venue);
  });

  test("delete One venue - success", async () => {
    const id = testVenues[0]._id;
    await db.venueStore.deleteVenueById(id);
    const returnedVenues = await db.venueStore.getAllVenues();
    assert.equal(returnedVenues.length, testVenues.length - 1);
    const deletedVenue = await db.venueStore.getVenueById(id);
    assert.isNull(deletedVenue);
  });

  test("get a venue - bad params", async () => {
    assert.isNull(await db.venueStore.getVenueById(""));
    assert.isNull(await db.venueStore.getVenueById());
  });

  test("delete one venue - fail", async () => {
    await db.venueStore.deleteVenueById("bad-id");
    const allVenues = await db.venueStore.getAllVenues();
    assert.equal(testVenues.length, allVenues.length);
  });
});


