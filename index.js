const express = require("express");
const app = express();

app.use(express.json());

let citas = [];

app.post("/citas", (req, res) => {
  const { fecha, hora, email } = req.body;

  if (!fecha || !hora || !email) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const nuevaCita = { id: citas.length + 1, fecha, hora, email };
  citas.push(nuevaCita);

  res.status(201).json(nuevaCita);
});


app.delete("/citas/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = citas.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Cita no encontrada" });
  }

  citas.splice(index, 1);

  res.json({ mensaje: "Cita cancelada" });
});

app.put("/citas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { fecha, hora, email } = req.body;

  const cita = citas.find(c => c.id === id);

  if (!cita) {
    return res.status(404).json({ error: "Cita no encontrada" });
  }

  if (fecha) cita.fecha = fecha;
  if (hora) cita.hora = hora;
  if (email) cita.email = email;

  res.json(cita);
});

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
  });
}