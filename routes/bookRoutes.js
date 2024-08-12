import express from 'express';
import {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
} from '../controllers/BookController.js';

const router = express.Router();

router.post('/create', createBook);
router.get('/list', getBooks);
router.get('/detail/:id', getBookById);
router.patch('/update/:id', updateBook);
router.delete('/delete/:id', deleteBook);

export default router;
