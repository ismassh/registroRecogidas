import { Router } from "express";
import pool from "../database/database.js"; const router = Router();

router.get('/precios', (req, res) => {
    res.render('precios/add');
});

export default router;