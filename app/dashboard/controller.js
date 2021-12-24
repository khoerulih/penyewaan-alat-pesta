const Transaksi = require('../transaksi/model');
const Pelanggan = require('../pelanggan/model');

module.exports = {
  index: async (req, res) => {
    try {
      const countTransaksi = await Transaksi.count();
      const countPelanggan = await Pelanggan.count();

      res.render('dashboard/index', {
        countTransaksi,
        countPelanggan,
        title: 'Halaman Dashboard',
      });
    } catch (err) {
      console.log(err);
    }
  },
};
