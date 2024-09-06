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
                estado,
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
            estado,
            observaciones
        }
        await pool.query('INSERT INTO registros SET ?', [nuevoRegistro]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM registros');
        res.render('registros/list', {
            registros: result
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

export default router;