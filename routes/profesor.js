const express = require('express');
const router = express.Router();
const db = require('../db');

// crear profesor
router.post('/', (req, res) => {
    const { nombre, apellido, documento, telefono, especialidad } = req.body;

    db.query(
        'INSERT INTO profesores (nombre, apellido, documento, telefono, especialidad) VALUES (?, ?, ?, ?, ?)',
        [nombre, apellido, documento, telefono, especialidad],
        (err, result) => {
            if (err) return res.status(500).json(err);

            res.json({ mensaje: 'Profesor creado correctamente', id: result.insertId });
        }
    );
});

// eliminar profesor
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM profesores WHERE id_profesor = ?', [id], (err) => {
        if (err) return res.status(500).json(err);

        res.json({ mensaje: 'Profesor eliminado correctamente' });
    });
});

module.exports = router;