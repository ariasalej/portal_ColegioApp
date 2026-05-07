const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const sql = "SELECT * FROM usuarios WHERE username = ?";

  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en el servidor" });
    if (results.length === 0)
      return res.status(401).json({ error: "Usuario no existe" });

    const user = results[0];

    if (password !== user.password) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Buscar nombre según rol
    let nombreQuery = "";
    let nombreId = null;

    if (user.rol === "profesor") {
      nombreQuery =
        "SELECT nombre, apellido FROM profesores WHERE id_profesor = ?";
      nombreId = user.id_profesor;
    } else if (user.rol === "estudiante") {
      nombreQuery =
        "SELECT nombre, apellido FROM estudiantes WHERE id_estudiante = ?";
      nombreId = user.id_estudiante;
    }

    const enviarRespuesta = (nombre, apellido) => {
      const token = jwt.sign(
        { id: user.id_usuario, rol: user.rol },
        process.env.JWT_SECRET || "secreto123",
        { expiresIn: "1h" },
      );

      res.json({
        mensaje: "Login exitoso",
        token,
        usuario: {
          id_usuario: user.id_usuario,
          username: user.username,
          rol: user.rol,
          nombre,
          apellido,
          id_estudiante: user.id_estudiante,
          id_profesor: user.id_profesor,
        },
      });
    };

    if (nombreQuery) {
      db.query(nombreQuery, [nombreId], (err2, res2) => {
        if (err2 || res2.length === 0)
          return enviarRespuesta(user.username, "");
        enviarRespuesta(res2[0].nombre, res2[0].apellido);
      });
    } else {
      // Director no tiene tabla propia
      enviarRespuesta("Director", "");
    }
  });
});

module.exports = router;
