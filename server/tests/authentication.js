const expect = require("chai").expect;
const request = require("supertest");
const { app, db } = require("../index");
const { url, register, credentials } = require("./tests.config");

describe("Authentication", () => {
  before(function(done) {
    db.dropDatabase(function() {
      done();
    });
  });

  it("Registers user", done => {
    request(app)
      .post(url.registration)
      .send(register)
      .then(res => {
        expect(res.status).to.be.equal(201);
        done();
      });
  });

  it("Returns username already in use", done => {
    request(app)
      .post(url.registration)
      .send(register)
      .then(res => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("Returns wrong credentials message", done => {
    request(app)
      .post(url.login)
      .send({ username: "Wrong username", password: "Wrong password" })
      .then(res => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("Logs user in", done => {
    request(app)
      .post(url.login)
      .send({ username: register.username, password: register.password })
      .then(res => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("user");
        expect(res.body).to.have.property("token");
        expect(res.body.user).to.have.property("username");
        credentials.token = res.body.token;
        credentials.user = res.body.user;
        done();
      });
  });
});
