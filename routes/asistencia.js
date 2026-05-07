const express = require("express");
const router = express.Router();
const db = require("../db");

// Registrar asistencia
router.post("/", (req, res) => {
  const { id_estudiante, fecha, estado } = req.body;

  const sql =
    "INSERT INTO asistencia (id_estudiante, fecha, estado) VALUES (?, ?, ?)";

  db.query(sql, [id_estudiante, fecha, estado], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Error al registrar asistencia" });
    res.json({ mensaje: "Asistencia registrada correctamente" });
  });
});

// Ver asistencia de un estudiante
router.get("/:id_estudiante", (req, res) => {
  const { id_estudiante } = req.params;

  const sql = `
        SELECT fecha, estado 
        FROM asistencia 
        WHERE id_estudiante = ?
        ORDER BY fecha DESC
    `;

  db.query(sql, [id_estudiante], (err, results) => {
    if (err)
      return res.status(500).json({ error: "Error al obtener asistencia" });
    res.json(results);
  });
});

module.exports = router;
