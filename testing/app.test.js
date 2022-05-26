const apigee = require("../config/apigeeProxy.json");
const axios = require("axios");

describe("Crimes functional tests", () => {

    describe("when we get crimes with params including apikey", () => {
        it("should respond with a 200 status code with all crimes", async () => {
            const result = await axios.get(`${apigee.url}/crimes?apikey=${apigee.apikey}`);

            expect(result.status).toBe(200);
        });

        it("should respond with a 200 status code with all crimes by userId", async () => {
            const result = await axios.get(`${apigee.url}/crimes?apikey=${apigee.apikey}&userId=854aa5d0-bbfb-11ec-8115-63fb9536bdba`);

            expect(result.status).toBe(200);
        });

        it("should respond with a 200 status code with all crimes by policeStationId", async () => {
            const result = await axios.get(`${apigee.url}/crimes?apikey=${apigee.apikey}&policeStationId=623a2970-b7e7-11ec-be73-b58754443b73`);

            expect(result.status).toBe(200);
        });

        it("should respond with a 200 status code with all crimes with a given crime name", async () => {
            const result = await axios.get(`${apigee.url}/crimes?apikey=${apigee.apikey}&searchByName=Murder`);

            expect(result.status).toBe(200);
        });

        it("should respond with a 200 status code with all crimes with a given crime rate", async () => {
            const result = await axios.get(`${apigee.url}/crimes?apikey=${apigee.apikey}&searchByRate=123321`);

            expect(result.status).toBe(200);

        });

        it("should respond with a 200 status code with all crimes by date", async () => {
            const result = await axios.get(`${apigee.url}/crimes?apikey=${apigee.apikey}&searchByDate=10.04.2022`);

            expect(result.status).toBe(200);
        });
    })

    describe("when we get crimes without apikey", () => {
        it("should respond error with status code 401", async () => {
            await axios.get(`${apigee.url}/crimes`)
                .catch((e) => {
                    expect(e.response.data.status).toBe(401);
                    expect(e.response.data.message).toEqual("User is not authorized");
                });
        });

    });

    describe("when we get crime by id", () => {
        it("should respond with a 200 status code with crime by id", async () => {
            const result = await axios.get(`${apigee.url}/crimes/83a50770-bfb1-11ec-a99d-fd76db8b3fd1?apikey=${apigee.apikey}`);

            expect(result.status).toBe(200);
            expect(result.data.id).toEqual("83a50770-bfb1-11ec-a99d-fd76db8b3fd1");
        });

        it("should error status 400 with this crime id", async () => {
            await axios.get(`${apigee.url}/crimes/83a11ec-a99d-fd76db8b3fd1?apikey=${apigee.apikey}`)
                .catch((e) => {
                    expect(e.response.data.status).toBe(400);
                    expect(e.response.data.error).toEqual("Bad request");
                });
        });

    })

    describe("when we add crimes", () => {
        it("should return a validation error with status code 400 when a field is missing", async () => {
            await axios.post(`${apigee.url}/crimes?apikey=${apigee.apikey}`)
                .catch((e) => {
                    expect(e.response.data.status).toBe(400);
                    expect(e.response.data.error).toEqual("Bad request");
                });
        });
    });

    describe("when we change crime", () => {
        it("should respond error wit status code 400", async () => {
            await axios.patch(`${apigee.url}/crimes/83a50770-bfb1-11ec-a99d-fd76db8b3fd1?apikey=${apigee.apikey}`)
            .catch((e) => {
                expect(e.response.data.status).toBe(400);
                expect(e.response.data.error).toEqual("Bad request");
            });
        });
    });
});
