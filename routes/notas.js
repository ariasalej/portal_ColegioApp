const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear nota
router.post('/', (req, res) => {
    const { id_estudiante, id_asignacion, periodo, nota } = req.body;

    const sql = `
        INSERT INTO notas (id_estudiante, id_asignacion, periodo, nota)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [id_estudiante, id_asignacion, periodo, nota], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al guardar nota' });
        }
        res.json({ mensaje: 'Nota guardada correctamente' });
    });
});

// actualizar nota
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nota } = req.body;

    const sql = 'UPDATE notas SET nota=? WHERE id_nota=?';

    db.query(sql, [nota, id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Nota no existe' });
        }

        res.json({ mensaje: 'Nota actualizada correctamente' });
    });
});

// Ver notas de un estudiante
router.get('/:id_estudiante', (req, res) => {
    const { id_estudiante } = req.params;

    const sql = `
        SELECT m.nombre AS materia, n.periodo, n.nota
        FROM notas n
        JOIN asignaciones a ON n.id_asignacion = a.id_asignacion
        JOIN materias m ON a.id_materia = m.id_materia
        WHERE n.id_estudiante = ?
        ORDER BY m.nombre, n.periodo
    `;

    db.query(sql, [id_estudiante], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener notas' });
        res.json(results);
    });
});

module.exports = router;