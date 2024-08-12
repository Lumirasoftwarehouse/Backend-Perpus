import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from './userModels.js';
import Book from './book.js';

const { DataTypes } = Sequelize;

const Loan = db.define('loans', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    bookId: {
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            key: 'id'
        }
    },
    loanDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    freezeTableName: true
});

User.hasMany(Loan, { foreignKey: 'userId' });
Book.hasMany(Loan, { foreignKey: 'bookId' });
Loan.belongsTo(User, { foreignKey: 'userId' });
Loan.belongsTo(Book, { foreignKey: 'bookId' });

export default Loan;

(async () => {
    await db.sync();
})();
