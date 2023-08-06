import request from "supertest";

// What is request?

// console.log(`>> The typeof request: ${typeof request}`); //Function
// console.log(`>> Number of args: ${request.length}`); //1 args
// console.log(`>> What is the definition of the function: ${request.toString()}`);
/**
 * @param {string} testid
 * @param {string} baseURL
 * @param {string} endpoint
 * @param {string} authToken
 * @param {object} queryParam
 * @param {object} payload
 */

let payload = {
  email: "eve.holt@reqres.in",
  password: "pistol",
};

async function GET(testid, baseURL, endpoint, authToken, queryParam) {
  if (!baseURL || !endpoint) {
    throw Error(
      `Given baseURL: ${baseURL}, or endpoint ${endpoint} is not valid`
    );
  }
  baseURL = baseURL.trim();
  endpoint = endpoint.trim();
  try {
    return await request(baseURL)
      .get(endpoint)
      .query(queryParam)
      .auth(authToken, { type: "bearer" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
  } catch (e) {
    e.message = `Error making a GET call to ${endpoint}, ${e}`;
    throw e;
  }
}

async function POST(testid, baseURL, endpoint, authToken, payload) {
  if (!baseURL || !endpoint) {
    throw Error(
      `Given baseURL: ${baseURL}, or endpoint ${endpoint} is not valid`
    );
  }
  baseURL = baseURL.trim();
  endpoint = endpoint.trim();
  try {
    return await request(baseURL)
      .post(endpoint)
      .auth(authToken, { type: "bearer" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(payload);
  } catch (e) {
    e.message = `Error making a POST call to ${endpoint}, ${e}`;
    throw e;
  }
}

export default { GET, POST };

/**
 * https://reqres.in
 * /api.users?page=2
 * {pages: 2}
 */
