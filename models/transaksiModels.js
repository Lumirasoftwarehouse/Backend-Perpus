import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const Transaksi = db.define('transaksi', {
    IDE: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    TANGGAL: {type: DataTypes.DATE, allowNull: false},
    NTRANS: { type: DataTypes.STRING},
    NBT: {type: DataTypes.STRING},
    DEPT: {type: DataTypes.INTEGER, allowNull: false},
    PERIOD_ID: {type: DataTypes.STRING},
    SRC_MOD: {type: DataTypes.STRING},
    SUB_MODUL: {type: DataTypes.STRING},
    KTRANS: {type: DataTypes.STRING},
    KBT: {type: DataTypes.STRING},
    BT: {type: DataTypes.STRING},
    ACC: {type: DataTypes.STRING, allowNull: false},
    KETACC: {type: DataTypes.STRING},
    KETERANGAN: {type: DataTypes.TEXT},
    REF_1: {type: DataTypes.STRING},
    REF_2: {type: DataTypes.STRING},
    REF_3: {type: DataTypes.STRING},
    REF_4: {type: DataTypes.STRING},
    DEBET: {type: DataTypes.DOUBLE},
    KREDIT: {type: DataTypes.DOUBLE},
    ST: {type: DataTypes.STRING, allowNull: false},
    PRT: {type: DataTypes.INTEGER},
    KD: {type: DataTypes.STRING},
    KU: {type: DataTypes.STRING},
    CIF: {type: DataTypes.STRING},
    UID: {type: DataTypes.STRING},
    UID_APV: {type: DataTypes.STRING},
    TIME_STAMP: {type: DataTypes.DATE},
    LAST_UPDATE: {type: DataTypes.DATE}
}, {
    freezeTableName: true,
    timestamps: false,
});

export default Transaksi;

(async () => {
    await db.sync();
})();
