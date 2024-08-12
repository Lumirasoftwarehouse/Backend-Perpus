import { Sequelize } from 'sequelize';
import Transaksi from '../models/transaksiModels.js';

export const getTransaksiByYear = async (req, res) => {
    try {
        const { year } = req.params;

        const result = await Transaksi.findAll({
            where: {
                TANGGAL: {
                    [Sequelize.Op.between]: [`${year}-01-01`, `${year}-12-31`],
                },
            },
            attributes: ['TANGGAL', 'NTRANS', 'ACC',],
            order: [['TANGGAL', 'DESC']],
        });

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const getTransaksiByMonth = async (req, res) => {
    try {
        const { year, month } = req.params;

        const startDate = `${year}-${month}-01`;
        const endDate = (month === '12') ? `${parseInt(year) + 1}-01-01` : `${year}-${parseInt(month) + 1}-01`;

        const result = await Transaksi.findAll({
            where: {
                TANGGAL: {
                    [Sequelize.Op.between]: [startDate, endDate],
                },
            },
            attributes: ['TANGGAL', 'NTRANS', 'ACC',],
            order: [['TANGGAL', 'DESC']],
        });

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
