import express from "express";
// import {getUsers, getUserById} from "../controllers/UserController.js";
import {getTransaksiByYear, getTransaksiByMonth} from "../controllers/TransaksiController.js";

const router = express.Router();

router.get('/transaksi/:year', getTransaksiByYear);
router.get('/transaksi/:year/:month', getTransaksiByMonth);

export default router;