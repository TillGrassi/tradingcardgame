import { Cards } from "../models/cards";
import { Users } from "../models/user";
import { User_Cards } from "../models/user_cards";

const testUser = {
  username: "testuser",
  password: "password123",
};

//Users
describe("test users model methods", () => {
  const store = new Users();

  describe("test create/authenticate method", () => {
    it("creates and authenticates a new user", async () => {
      await store.create(testUser);
      const login = await store.authenticate(testUser);
      expect(login?.username).toEqual("testuser");
    });
  });

  describe("test show method", () => {
    it("fetches user", async () => {
      const user = await store.show("testuser");
      expect(user).toBeDefined();
    });
  });
});

//Cards
describe("cards model works", () => {
  const store = new Cards();
  describe("test booster method", () => {
    it("returns 5 cards", async () => {
      const pack = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5
      }
      const booster = await store.booster(pack)
      expect(booster).toBeDefined();
      expect(booster[0]).toEqual({      
        id: 1,
        name: 'Susi',
        image: 'common_1',
        description: null,
        effect: null,
        rarity: 'common'
      })
    });
  });
});

//User_Cards
describe("test user_cards models", () => {
  const store = new User_Cards();

  describe("test insert method", () => {
    it("inserts the cards with the correct username",async () => {
      const pack = {
        username: "testuser",
        card1: 1,
        card2: 2,
        card3: 3,
        card4: 4,
        card5: 5
      }
      const result = await store.addCards(pack);
      expect(result).toBeDefined();
    })
  })
  describe("test get method", () => {
    it("gets the collection works correctly", async () => {
      const result = await store.collection("testuser");
      expect(result).toBeDefined();
    })
  })
})