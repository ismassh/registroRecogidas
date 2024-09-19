import { Router } from "express";
import pool from "../database/database.js";

const router = Router();

// Petición GET:
router.get('/precios/add', (req, res) => {
    res.render('precios/add');
});

// Endpoint para añadir los productos:
router.post('/precios/add', async (req, res) => {
    try {
        const { familia, sku, tarifa_ewin, asegurado, peso, alto, ancho, longitud } = req.body;

        const nuevoProducto = {
            familia,
            sku,
            tarifa_ewin,
            agencia: 'CTT Express', // Agencia es fija
            asegurado,
            peso,
            alto,
            ancho,
            longitud
        };

        // Insertar el nuevo producto en la base de datos
        await pool.query('INSERT INTO productos SET ?', [nuevoProducto]);
        res.redirect('/precios/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/precios/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM productos');
        res.render('precios/list', {
            productos: result
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/precios/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [producto] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
        const productoEdit = producto[0];
        res.render('precios/edit', { producto: productoEdit });
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.post('/precios/edit/:id', async (req, res) => {
    try {
        const { familia, sku, tarifa_ewin, peso, alto, ancho, longitud } = req.body;

        const { id } = req.params;

        const editProducto = {
            familia,
            sku,
            tarifa_ewin,
            agencia: 'CTT Express', // Agencia es fija
            peso,
            alto,
            ancho,
            longitud
        };
        await pool.query('UPDATE productos SET ? WHERE id = ?', [editProducto, id]);
        res.redirect('/precios/list');
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.get('/precios/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM productos WHERE id = ?', [id]);
        res.redirect('/precios/list');
    } catch (error) {
        res.status(500).json({ message: err.message })
    }
});

export default router;