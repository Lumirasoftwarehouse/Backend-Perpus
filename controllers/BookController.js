import { validationResult } from 'express-validator';
import Book from '../models/book.js';

export const createBook = async (req, res) => {
    // Validasi input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Spesifik field yang diambil dari req.body
    const { title, genre, author, publishedYear } = req.body;

    try {
        const newBook = await Book.create({
            title,
            genre,
            author,
            publishedYear,
        });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookById = async (req, res) => {
    try {
        const book = await Book.findOne({
            where: { id: req.params.id }
        });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBook = async (req, res) => {
    try {
        const book = await Book.update(req.body, {
            where: { id: req.params.id }
        });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const book = await Book.destroy({
            where: { id: req.params.id }
        });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
