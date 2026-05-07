const express = require('express');
const router = express.Router();
const db = require('../db');

// CREAR ESTUDIANTE
router.post('/', (req, res) => {
    const { nombre, apellido, documento, telefono, id_curso } = req.body;

    db.query(
        'INSERT INTO estudiantes (nombre, apellido, documento, telefono, id_curso) VALUES (?, ?, ?, ?, ?)',
        [nombre, apellido, documento, telefono, id_curso],
        (err, result) => {
            if (err) return res.status(500).json({ error: 'Error al crear estudiante' });
            res.json({ mensaje: 'Estudiante creado correctamente', id: result.insertId });
        }
    );
});

// ELIMINAR ESTUDIANTE
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    console.log("DELETE recibido con ID:", id);

    // Primero borrar notas
    db.query('DELETE FROM notas WHERE id_estudiante = ?', [id], (err) => {
        if (err) {
            console.error("Error borrando notas:", err);
            return res.status(500).json({ error: 'Error al eliminar notas' });
        }

        // Luego borrar estudiante
        db.query('DELETE FROM estudiantes WHERE id_estudiante = ?', [id], (err, result) => {
            if (err) {
                console.error("Error borrando estudiante:", err);
                return res.status(500).json({ error: 'Error al eliminar estudiante' });
            }

            console.log("Filas afectadas:", result.affectedRows);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Estudiante no existe' });
            }

            res.json({ mensaje: 'Estudiante eliminado correctamente' });
        });
    });
});

module.exports = router;