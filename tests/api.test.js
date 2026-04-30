const request = require("supertest");
const { expect } = require("chai");
const mongoose = require("mongoose");
require("dotenv").config();



const app = require("../app");
const User = require("../models/User");

let token;
let createdCatwayNumber = Math.floor(Date.now() / 1000);
let createdReservationId;

describe("Capitainerie API - 9 fonctionnalités", function () {
  this.timeout(20000);

  before(async () => {
    // 🔥 Connexion Mongo
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    let user = await User.findOne({ email: "admin@test.com" });

    if (!user) {
        user = new User({
            name: "Admin Test",
            email: "admin@test.com",
            password: "password123",
        });

        await user.save();
    } else {
        user.name = "Admin Test";
        user.password = "password123";
        await user.save();
    }

    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "admin@test.com",
        password: "password123",
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");

    token = res.body.token;
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("1. Créer un catway", async () => {
    const res = await request(app)
        .post("/catways")
        .set("Authorization", `Bearer ${token}`)
        .send({
        catwayNumber: createdCatwayNumber,
        type: "long",
        catwayState: "Disponible",
        });

    

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("catwayNumber", createdCatwayNumber);
  });

  it("2. Lister l’ensemble des catways", async () => {
    const res = await request(app).get("/catways");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("3. Récupérer les détails d’un catway en particulier", async () => {
    const res = await request(app).get(`/catways/${createdCatwayNumber}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("catwayNumber", createdCatwayNumber);
  });

  it("4. Modifier la description de l’état d’un catway en particulier", async () => {
    const res = await request(app)
      .patch(`/catways/${createdCatwayNumber}`)
      .send({
        catwayState: "maintenance",
      });

    

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("catwayState", "maintenance");
  });

  it("5. Prendre la réservation d’un catway", async () => {
    const res = await request(app)
      .post(`/catways/${createdCatwayNumber}/reservations`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        catwayNumber: createdCatwayNumber,
        clientName: "Jean Test",
        boatName: "Test Boat",
        checkIn: "2030-06-01",
        checkOut: "2030-06-10",
      });

    

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("catwayNumber", createdCatwayNumber);

    createdReservationId = res.body._id;
  });

  it("6. Lister l’ensemble des réservations", async () => {
    const res = await request(app).get("/reservations");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("7. Afficher les détails d’une réservation en particulier", async () => {
    const res = await request(app).get(
      `/catways/${createdCatwayNumber}/reservations/${createdReservationId}`
    );

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id", createdReservationId);
  });

  it("8. Supprimer une réservation", async () => {
    const res = await request(app)
      .delete(`/catways/${createdCatwayNumber}/reservations/${createdReservationId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
  });

  it("9. Supprimer un catway", async () => {
    const res = await request(app)
      .delete(`/catways/${createdCatwayNumber}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
  });
});