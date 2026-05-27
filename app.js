const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const estudiantesRoutes = require("./routes/estudiantes");
const loginRoutes = require("./routes/login");
const notasRoutes = require("./routes/notas");
const profesoresRoutes = require("./routes/profesor");
const asignacionesRoutes = require("./routes/asignaciones");
const asistenciaRoutes = require("./routes/asistencia");
const materiasRoutes = require("./routes/materias");
const cursosRoutes = require("./routes/cursos");

app.use("/cursos", cursosRoutes);
app.use("/asistencia", asistenciaRoutes);
app.use("/asignaciones", asignacionesRoutes);
app.use("/estudiantes", estudiantesRoutes);
app.use("/login", loginRoutes);
app.use("/notas", notasRoutes);
app.use("/profesores", profesoresRoutes);
app.use("/materias", materiasRoutes);

//  Ruta base
app.get("/", (req, res) => {
  res.send(" API del colegio funcionando");
});

// Ruta no encontrada (MUY IMPORTANTE)
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada " });
});

//  Manejo de errores global
app.use((err, req, res, next) => {
  console.error("ERROR:", err.stack);
  res.status(500).json({ error: "Algo se rompió feo " });
});

// Servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
