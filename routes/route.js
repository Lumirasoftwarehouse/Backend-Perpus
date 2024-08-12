import express from 'express';
import { body } from 'express-validator';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/UserController.js';
import { createBook, getBooks, getBookById, updateBook, deleteBook } from '../controllers/BookController.js';
import { createLoan, returnLoan, getLoans, deleteLoan} from '../controllers/LoanController.js';
import { pinjamBuku, kembalikanBuku, getRiwayatPinjam } from "../controllers/PinjamBukuController.js";

const router = express.Router();

// User routes
router.post('/create-user', createUser);
router.get('/users', getUsers);
router.post('/update-users/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);

// Book routes
router.post(
    '/create-book',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('genre').notEmpty().withMessage('Genre is required'),
        body('author').notEmpty().withMessage('Author is required'),
        body('publishedYear').isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('Valid Published Year is required'),
    ],
    createBook
);
// router.post('/create-book', createBook);
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.post('/update-book/:id', updateBook);
router.delete('/books/:id', deleteBook);

// Loan routes
router.post('/loans', createLoan);
router.post('/loans-return', returnLoan);
router.get('/loans', getLoans);
router.delete('/loans/:id', deleteLoan);

export default router;
