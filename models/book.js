import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Book = db.define('books', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    publishedYear: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    available: {
        type: DataTypes.STRING,
        defaultValue: 1
    }
}, {
    freezeTableName: true
});

export default Book;

(async () => {
    await db.sync();
})();
