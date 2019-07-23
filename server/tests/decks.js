const expect = require("chai").expect;
const request = require("supertest");
const { app } = require("../index");
let { url, credentials, deck, savedDecks } = require("./tests.config");

describe("Decks", () => {
  after(function(done) {
    request(app)
      .post(url.decks + "/post")
      .set("Authorization", "Bearer " + credentials.token)
      .send(deck)
      .then(res => {
        request(app)
          .get(url.decks)
          .set("Authorization", "Bearer " + credentials.token)
          .then(res => {
            savedDecks = res.body;
            done();
          });
      });
  });

  it("Adds a deck with already existing cards", done => {
    request(app)
      .post(url.decks + "/post")
      .set("Authorization", "Bearer " + credentials.token)
      .send(deck)
      .then(res => {
        expect(res.status).to.be.equal(201);
        done();
      });
  });

  it("Returns decks of logged in user", done => {
    request(app)
      .get(url.decks)
      .set("Authorization", "Bearer " + credentials.token)
      .then(res => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an("array");
        savedDecks = res.body;
        done();
      });
  });

  it("Doesn't return decks without token", done => {
    request(app)
      .get(url.decks)
      .then(res => {
        expect(res.status).to.be.equal(403);
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("Updates existing deck with new name", done => {
    savedDecks[0].name = "Updated Deck";
    request(app)
      .put(url.decks + `/update/${savedDecks[0]._id}`)
      .set("Authorization", "Bearer " + credentials.token)
      .send(savedDecks[0])
      .then(res => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });

  it("Updates existing deck with new card", done => {
    request(app)
      .put(url.decks + `/update/${savedDecks[0]._id}`)
      .set("Authorization", "Bearer " + credentials.token)
      .send(savedDecks[0])
      .then(res => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });

  it("Doesn't delete existing deck without token", done => {
    request(app)
      .delete(url.decks + `/delete/${savedDecks[0]._id}`)
      .then(res => {
        expect(res.status).to.be.equal(403);
        done();
      });
  });

  it("Deletes existing deck with token", done => {
    request(app)
      .delete(url.decks + `/delete/${savedDecks[0]._id}`)
      .set("Authorization", "Bearer " + credentials.token)
      .then(res => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});
