// model/PinjamBuku.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./userModels.js";
import Book from "./book.js";

const { DataTypes } = Sequelize;

const PinjamBuku = db.define('pinjam_buku', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    bookId: {
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            key: 'id'
        },
        allowNull: false
    },
    tanggalPinjam: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    tanggalKembali: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    freezeTableName: true
});

User.hasMany(PinjamBuku, { foreignKey: 'userId' });
Book.hasMany(PinjamBuku, { foreignKey: 'bookId' });
PinjamBuku.belongsTo(User, { foreignKey: 'userId' });
PinjamBuku.belongsTo(Book, { foreignKey: 'bookId' });

export default PinjamBuku;

(async () => {
    await db.sync();
})();
