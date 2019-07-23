const UserSchema = require("../models/user");
const expect = require("chai").expect;
const request = require("supertest");
const { app } = require("../index");
let {
  url,
  credentials,
  savedCards,
  deck,
  savedDecks,
  secondUser,
  secondCredentials
} = require("./tests.config");

describe("Administration", () => {
  before(function(done) {
    request(app)
      .post(url.registration)
      .send(secondUser)
      .then(() => {
        request(app)
          .post(url.login)
          .send({
            username: secondUser.username,
            password: secondUser.password
          })
          .then(res => {
            expect(res.status).to.be.equal(200);
            secondCredentials.user = res.body.user;
            secondCredentials.token = res.body.token;
            done();
          });
      });
  });

  it("Returns users for admin", done => {
    request(app)
      .get(url.admin + "/users")
      .set("Authorization", "Bearer " + credentials.token)
      .then(res => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("array");
        done();
      });
  });

  it("Returns cards for admin", done => {
    request(app)
      .get(url.admin + "/cards")
      .set("Authorization", "Bearer " + credentials.token)
      .then(res => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("array");
        savedCards = res.body;
        done();
      });
  });

  it("Returns decks for admin", done => {
    request(app)
      .get(url.admin + "/decks")
      .set("Authorization", "Bearer " + credentials.token)
      .then(res => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("array");
        savedDecks = res.body;
        done();
      });
  });

  it("Updates a user by admin request", done => {
    request(app)
      .put(url.admin + `/users/update/${secondCredentials.user._id}`)
      .set("Authorization", "Bearer " + credentials.token)
      .send({
        username: "KillaUpdated",
        realName: "Killa Real Update",
        userType: "default"
      })
      .then(res => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });

  it("Doesn't update a user without admin permissions", done => {
    request(app)
      .put(url.admin + `/users/update/${credentials.user._id}`)
      .set("Authorization", "Bearer " + secondCredentials.token)
      .send({
        username: "KillaUpdated",
        realName: "Killa Real Update",
        userType: "default"
      })
      .then(res => {
        expect(res.status).to.be.equal(403);
        done();
      });
  });

  it("Doesn't update currently logged admin to default type", done => {
    request(app)
      .put(url.admin + `/users/update/${credentials.user._id}`)
      .set("Authorization", "Bearer " + credentials.token)
      .send({
        username: "KillaUpdated",
        realName: "Killa Real Update",
        userType: "default"
      })
      .then(res => {
        expect(res.status).to.be.equal(400);
        done();
      });
  });

  it("Doesn't delete a user without admin permissions", done => {
    request(app)
      .delete(url.admin + `/users/delete/${credentials.user._id}`)
      .set("Authorization", "Bearer " + secondCredentials.token)
      .then(res => {
        expect(res.status).to.be.equal(403);
        done();
      });
  });

  it("Doesn't let admin delete himself", done => {
    request(app)
      .delete(url.admin + `/users/delete/${credentials.user._id}`)
      .set("Authorization", "Bearer " + credentials.token)
      .then(res => {
        expect(res.status).to.be.equal(400);
        done();
      });
  });

  it("Doesn't update a card without admin permissions", done => {
    request(app)
      .put(url.admin + `/cards/update/${savedCards[0]._id}`)
      .set("Authorization", "Bearer " + secondCredentials.token)
      .send({ mana: 3, name: "Won't update card", description: "No" })
      .then(res => {
        expect(res.status).to.be.equal(403);
        done();
      });
  });

  it("Doesn't update a deck without admin permissions", done => {
    request(app)
      .put(url.admin + `/decks/update/${savedDecks[0]._id}`)
      .set("Authorization", "Bearer " + secondCredentials.token)
      .send({ name: "Won't update deck", cards: deck.cards })
      .then(res => {
        expect(res.status).to.be.equal(403);
        done();
      });
  });

  it("Doesn't delete a card without admin permissions", done => {
    request(app)
      .delete(url.admin + `/cards/delete/${savedCards[0]._id}`)
      .set("Authorization", "Bearer " + secondCredentials.token)
      .then(res => {
        expect(res.status).to.be.equal(403);
        done();
      });
  });

  it("Doesn't delete a deck without admin permissions", done => {
    request(app)
      .delete(url.admin + `/decks/delete/${savedDecks[0]._id}`)
      .set("Authorization", "Bearer " + secondCredentials.token)
      .then(res => {
        expect(res.status).to.be.equal(403);
        done();
      });
  });
});
