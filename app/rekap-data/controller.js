const Transaksi = require('../transaksi/model');

module.exports = {
  daily: async (req, res) => {
    try {
      const data = await Transaksi.aggregate([
        {
          $group: {
            _id: {
              day: { $dayOfMonth: '$tanggalPeminjaman' },
              month: { $month: '$tanggalPeminjaman' },
              year: { $year: '$tanggalPeminjaman' },
            },
            value: { $sum: '$total' },
            count: { $sum: 1 },
          },
        },
      ]);

      res.render('rekap-data/daily', {
        data,
        title: 'Rekap Data Harian',
      });
    } catch (err) {
      console.log(err);
    }
  },
  monthly: async (req, res) => {
    try {
      const data = await Transaksi.aggregate([
        {
          $group: {
            _id: {
              month: { $month: '$tanggalPeminjaman' },
              year: { $year: '$tanggalPeminjaman' },
            },
            value: { $sum: '$total' },
            count: { $sum: 1 },
          },
        },
      ]);

      res.render('rekap-data/monthly', {
        data,
        title: 'Rekap Data Bulanan',
      });
    } catch (err) {
      console.log(err);
    }
  },
  yearly: async (req, res) => {
    try {
      const data = await Transaksi.aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$tanggalPeminjaman' },
            },
            value: { $sum: '$total' },
            count: { $sum: 1 },
          },
        },
      ]);

      res.render('rekap-data/yearly', {
        data,
        title: 'Rekap Data Tahunan',
      });
    } catch (err) {
      console.log(err);
    }
  },
};
