const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener asignaciones de un profesor
router.get('/:id_profesor', (req, res) => {
    const { id_profesor } = req.params;

    const sql = `
        SELECT a.id_asignacion, m.nombre AS materia, c.nombre AS curso
        FROM asignaciones a
        JOIN materias m ON a.id_materia = m.id_materia
        JOIN cursos c ON a.id_curso = c.id_curso
        WHERE a.id_profesor = ?
    `;

    db.query(sql, [id_profesor], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener asignaciones' });
        res.json(results);
    });
});

module.exports = router;