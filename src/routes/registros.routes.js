import { Router } from "express";
import pool from "../database/database.js";

const router = Router();

router.get('/add', (req, res) => {
    res.render('registros/add');
});

router.post('/add', async (req, res) => {
    try {
        const
            { tienda,
                articulo,
                referencia,
                agencia,
                numero_envio,
                fecha_creacion,
                motivo,
                fecha_recepcion,
                observaciones }
                = req.body;

        const nuevoRegistro = {
            tienda,
            articulo,
            referencia,
            agencia,
            numero_envio,
            fecha_creacion,
            motivo,
            fecha_recepcion,
            observaciones
        }
        await pool.query('INSERT INTO registros SET ?', [nuevoRegistro]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM registros');
        res.render('registros/list', {
            registros: result
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [registro] = await pool.query('SELECT * FROM registros WHERE id = ?', [id]);
        const registroEdit = registro[0];
        res.render('registros/edit', { registro: registroEdit });
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.post('/edit/:id', async (req, res) => {
    try {
        const { tienda,
            articulo,
            referencia,
            agencia,
            numero_envio,
            fecha_creacion,
            motivo,
            fecha_recepcion,
            observaciones } = req.body;

        const { id } = req.params;

        const editRegistro = {
            tienda,
            articulo,
            referencia,
            agencia,
            numero_envio,
            fecha_creacion,
            motivo,
            fecha_recepcion,
            observaciones
        };
        await pool.query('UPDATE registros SET ? WHERE id = ?', [editRegistro, id]);
        res.redirect('/list');
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM registros WHERE id = ?', [id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: err.message })
    }
});

router.get('/finish/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('UPDATE registros SET finalizado = TRUE WHERE id = ?', [id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: err.message })
    }
});

export default router;