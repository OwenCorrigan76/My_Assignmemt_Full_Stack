/* import { assert } from "chai";
import { liveVenueService } from "./live-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, club, testVenueTypes } from "../fixtures.js";

suite("VenueType API tests", () => {
    let user = null;
    setup(async () => {
        liveVenueService.clearAuth();
        user = await liveVenueService.createUser(maggie);
        await liveVenueService.authenticate(maggie);
        await liveVenueService.deleteAllVenueTypes();
        await liveVenueService.deleteAllUsers();
        user = await liveVenueService.createUser(maggie);
        await liveVenueService.authenticate(maggie);
        club.userid = user._id;
    });
    teardown(async () => {});

    test("create venueType", async () => {
        const returnedVenueType = await liveVenueService.createVenueType(club);
        assert.isNotNull(returnedVenueType);
        assertSubset(club, returnedVenueType);
    });

    test("delete a venueType", async () => {
        const venueType = await liveVenueService.createVenueType(club);
        const response = await liveVenueService.deleteVenueType(venueType._id);
        assert.equal(response.status, 204);
        try {
            const returnedVenueType = await liveVenueService.getVenueType(venueType.id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No VenueType with this id", "Incorrect Response Message");
        }
    });

    test("create multiple venueTypes", async () => {
    });

    test("remove non-existant venueType", async () => {
    });
});


 */