const request = require("supertest");
const app = require("../index");

describe("API de citas", () => {

  it("debería crear una cita", async () => {
    const res = await request(app)
      .post("/citas")
      .send({
        fecha: "2026-03-25",
        hora: "10:00",
        email: "test@email.com"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("debería fallar si faltan datos", async () => {
    const res = await request(app)
      .post("/citas")
      .send({
        fecha: "2026-03-25"
      });

    expect(res.statusCode).toBe(400);
  });

  it("debería eliminar una cita", async () => {
    const crear = await request(app)
      .post("/citas")
      .send({
        fecha: "2026-03-25",
        hora: "11:00",
        email: "test2@email.com"
      });

    const id = crear.body.id;

    const res = await request(app)
      .delete(`/citas/${id}`);

    expect(res.statusCode).toBe(200);
  });

  it("debería fallar si la cita no existe", async () => {
    const res = await request(app)
      .delete("/citas/999");

    expect(res.statusCode).toBe(404);
  });

  it("debería actualizar una cita", async () => {
    const crear = await request(app)
      .post("/citas")
      .send({
        fecha: "2026-03-25",
        hora: "12:00",
        email: "test3@email.com"
      });

    const id = crear.body.id;

    const res = await request(app)
      .put(`/citas/${id}`)
      .send({
        hora: "13:00"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.hora).toBe("13:00");
  });

});