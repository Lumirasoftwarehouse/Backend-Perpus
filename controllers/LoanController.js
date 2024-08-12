import Loan from '../models/Loan.js';
import Book from '../models/book.js';
import User from '../models/userModels.js';

export const createLoan = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        // Check if the book is available
        const book = await Book.findByPk(bookId);
        if (!book || book.available !== 1) {
            return res.status(400).json({ message: 'Book not available', data: book });
        }

        // Create loan
        const loan = await Loan.create(req.body);

        // Update book status
        book.available = 0;
        await book.save();

        res.status(201).json(loan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const returnLoan = async (req, res) => {
    try {
        const { loanId } = req.body;

        // Find the loan
        const loan = await Loan.findByPk(loanId);
        if (!loan || loan.returnDate) {
            return res.status(400).json({ message: 'Invalid loan' });
        }

        // Update return date
        loan.returnDate = new Date();
        await loan.save();

        // Update book status
        const book = await Book.findByPk(loan.bookId);
        book.available = 1; // Set available to 1
        await book.save();

        res.status(200).json(loan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getLoans = async (req, res) => {
    try {
        const loans = await Loan.findAll({
            include: [
                {
                    model: Book,
                    attributes: ['title'], // Pilih atribut yang ingin ditampilkan dari tabel Book
                },
                {
                    model: User,
                    attributes: ['name'], // Pilih atribut yang ingin ditampilkan dari tabel User
                },
            ],
        });
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteLoan = async (req, res) => {
    try {
        const { id } = req.params;

        // Cari peminjaman berdasarkan id
        const loan = await Loan.findByPk(id);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        // Periksa apakah buku sudah dikembalikan
        if (!loan.returnDate) {
            return res.status(400).json({ message: 'Cannot delete an active loan' });
        }

        // Hapus peminjaman
        await loan.destroy();

        res.status(200).json({ message: 'Loan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
