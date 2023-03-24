import http from "http";
import app from "../app";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const testUser = {
  username: "testuser2",
  password: "password123",
};
const token = jwt.sign({ user: testUser }, process.env.TOKEN_SECRET as string);

let server: http.Server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(8081, done);
});

afterAll((done) => {
  server.close(done);
});

describe("users api works", () => {
  describe("POST /users creates a new user", () => {
    it("returns statuscode 200", (done) => {
      const request = http.request(
        {
          hostname: "localhost",
          port: 8081,
          path: "/users",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
        (res) => {
          expect(res.statusCode).toBe(200);
          done();
        }
      );
      request.write(JSON.stringify({ username: "testuser2", password: "password123" }));
      request.end();
    });
  });
});

describe("GET /users/:username returns user info", () => {
  it("returns statuscode 200", (done) => {
    const request = http.request(
      {
        hostname: "localhost",
        port: 8081,
        path: "/users/testuser2",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      },
      (res) => {
        expect(res.statusCode).toBe(200);
        done();
      }
    );
    request.end();
  });
});

describe("POST /users/login authenticates a user", () => {
  it("returns statuscode 200", (done) => {
    const request = http.request(
      {
        hostname: "localhost",
        port: 8081,
        path: "/users/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      },
      (res) => {
        expect(res.statusCode).toBe(200);
        done();
      }
    );
    request.write(JSON.stringify({ username: "testuser2", password: "password123" }));
    request.end();
  });
});

describe("GET /booster returns a new booster pack", () => {
  it("returns statuscode 200", (done) => {
    const request = http.request(
      {
        hostname: "localhost",
        port: 8081,
        path: "/booster",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      },
      (res) => {
        expect(res.statusCode).toBe(200);
        done();
      }
    );
    request.end();
  });
});

describe("user cards api works", () => {
  describe("GET /collection returns the user's card collection", () => {
    it("returns status code 200 and an array of cards", (done) => {
      const request = http.request(
        {
          hostname: "localhost",
          port: 8081,
          path: "/collection?username=testuser2",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        },
        (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(JSON.parse(data))).toBe(true);
            done();
          });
        }
      );
      request.end();
    });
  });
});

describe("POST /addCards adds cards to the user's collection", () => {
  it("returns status code 200 and an object with the new collection", (done) => {
    const request = http.request(
      {
        hostname: "localhost",
        port: 8081,
        path: "/addCards",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          expect(res.statusCode).toBe(200);
          const response = JSON.parse(data);
          expect(response).toMatchObject({
            username:"testuser2",
            card1:1,
            card2:2,
            card3:3,
            card4:4,
            card5:5});
          done();
        });
      }
    );
    request.write(
      JSON.stringify({
        username: "testuser2",
        card1: 1,
        card2: 2,
        card3: 3,
        card4: 4,
        card5: 5,
      })
    );
    request.end();
  });
});




