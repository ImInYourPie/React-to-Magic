const expect = require("chai").expect;
const request = require("supertest");
const { app } = require("../index");
let { url, credentials, card, savedCards, deck } = require("./tests.config");

describe("Cards", () => {
  after(function(done) {
    request(app)
      .post(url.cards + "/post")
      .set("Authorization", "Bearer " + credentials.token)
      .send(card)
      .then(res => {
        request(app)
          .get(url.cards)
          .set("Authorization", "Bearer " + credentials.token)
          .then(res => {
            savedCards = res.body;
            deck.cards = res.body;
            done();
          });
      });
  });

  it("Adds a card for logged user", done => {
    request(app)
      .post(url.cards + "/post")
      .set("Authorization", "Bearer " + credentials.token)
      .send(card)
      .then(res => {
        expect(res.status).to.be.equal(201);
        done();
      });
  });

  it("Doesn't had a card without bearer token", done => {
    request(app)
      .post(url.cards + "/post")
      .send(card)
      .then(res => {
        expect(res.status).to.be.equal(403);
        done();
      });
  });

  it("Returns cards for currently logged in user", done => {
    request(app)
      .get(url.cards)
      .set("Authorization", "Bearer " + credentials.token)
      .then(res => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an("array");
        savedCards = res.body;
        done();
      });
  });

  it("Updates a card by id sent as params", done => {
    request(app)
      .put(url.cards + `/update/${savedCards[0]._id}`)
      .set("Authorization", "Bearer " + credentials.token)
      .send({ mana: 5, name: "Update test card", description: "Updated card" })
      .then(res => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });

  it("Deletes a card by id sent as params", done => {
    request(app)
      .delete(url.cards + `/delete/${savedCards[0]._id}`)
      .set("Authorization", "Bearer " + credentials.token)
      .then(res => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});
