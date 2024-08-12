// controllers/PinjamBukuController.js
import PinjamBuku from "../models/PinjamBuku.js";
import Book from "../models/book.js";
import User from "../models/userModels.js";

// Meminjam Buku
export const pinjamBuku = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        // Cek ketersediaan buku
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ message: "Buku tidak ditemukan" });
        }

        if (book.available !== 1) {
            return res.status(400).json({ message: "Buku tidak tersedia" });
        }

        // Membuat record pinjaman buku
        await PinjamBuku.create({ userId, bookId });
        await book.update({ available: 0 });

        res.status(201).json({ message: "Buku berhasil dipinjam" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mengembalikan Buku
export const kembalikanBuku = async (req, res) => {
    try {
        const { id } = req.params;

        // Cari record pinjaman buku berdasarkan id
        const pinjamBuku = await PinjamBuku.findByPk(id);
        if (!pinjamBuku) {
            return res.status(404).json({ message: "Data pinjaman tidak ditemukan" });
        }

        // Update status pengembalian
        pinjamBuku.tanggalKembali = new Date();
        await pinjamBuku.save();

        // Update status ketersediaan buku
        const book = await Book.findByPk(pinjamBuku.bookId);
        await book.update({ available: 1 });

        res.status(200).json({ message: "Buku berhasil dikembalikan" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Melihat Riwayat Peminjaman
export const getRiwayatPinjam = async (req, res) => {
    try {
        const riwayat = await PinjamBuku.findAll({
            include: [
                { model: User, attributes: ['name'] },
                { model: Book, attributes: ['title'] }
            ]
        });
        res.status(200).json(riwayat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
