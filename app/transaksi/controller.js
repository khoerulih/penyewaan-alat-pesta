const Transaksi = require('./model');
const Pelanggan = require('../pelanggan/model');
const Alat = require('../alat/model');

const moment = require('moment');

module.exports = {
  index: async (req, res) => {
    try {
      const transaksi = await Transaksi.find()
        .populate('pelanggans')
        .populate('alats');

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      req.res.render('transaksi/index', {
        transaksi,
        alert,
        moment,
        title: 'Halaman Transaksi',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/transaksi');
    }
  },
  viewCreate: async (req, res) => {
    try {
      const alats = await Alat.find();
      const pelanggans = await Pelanggan.find();
      res.render('transaksi/create', {
        alats,
        pelanggans,
        title: 'Halaman Tambah Transaksi',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/transaksi');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const {
        harga,
        jumlah,
        total,
        tanggalPeminjaman,
        durasiPeminjaman,
        statusAlat,
        alats,
        pelanggans,
      } = req.body;

      let transaksi = await Transaksi({
        harga,
        jumlah,
        total,
        tanggalPeminjaman,
        durasiPeminjaman,
        statusAlat,
        alats,
        pelanggans,
      });
      await transaksi.save();

      req.flash('alertMessage', 'Berhasil Menambah Transaksi');
      req.flash('alertStatus', 'success');

      res.redirect('/transaksi');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/transaksi');
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;

      await Transaksi.findByIdAndUpdate({ _id: id }, { statusAlat: status });
      req.flash('alertMessage', `Berhasil mengubah status`);
      req.flash('alertStatus', 'success');
      res.redirect('/transaksi');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/transaksi');
    }
  },
};
