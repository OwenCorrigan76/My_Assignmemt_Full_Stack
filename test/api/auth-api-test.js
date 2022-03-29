import { assert } from "chai";
import {liveService} from "./live-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";

suite("Authentication API tests", async () => {
    setup(async () => {
        liveService.clearAuth();
        await liveService.createUser(maggie);
        await liveService.authenticate(maggie);
        await liveService.deleteAllUsers();
    });

    test("authenticate", async () => {
        const returnedUser = await liveService.createUser(maggie);
        const response = await liveService.authenticate(maggie);
        assert(response.success);
        assert.isDefined(response.token);
    });

    test("verify Token", async () => {
        const returnedUser = await liveService.createUser(maggie);
        const response = await liveService.authenticate(maggie);

        const userInfo = decodeToken(response.token);
        assert.equal(userInfo.email, returnedUser.email);
        assert.equal(userInfo.userId, returnedUser._id);
    });
   /* test("check Unauthorized", async () => {
        liveService.clearAuth();
        try {
            await liveService.deleteAllUsers();
            assert.fail("Route not protected");
        } catch (error) {
            assert.equal(error.response.data.statusCode, 401);
        }
    });

    */
});