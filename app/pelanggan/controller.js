const Pelanggan = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const pelanggan = await Pelanggan.find();

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      req.res.render('pelanggan/index', {
        pelanggan,
        alert,
        title: 'Halaman Pelanggan',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pelanggan');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('pelanggan/create', {
        title: 'Halaman Tambah Pelanggan',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pelanggan');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { nama, alamat, noTelepon } = req.body;

      let pelanggan = await Pelanggan({ nama, alamat, noTelepon });
      await pelanggan.save();

      req.flash('alertMessage', 'Berhasil Menambah Pelanggan');
      req.flash('alertStatus', 'success');

      res.redirect('/pelanggan');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pelanggan');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      let pelanggan = await Pelanggan.findOne({ _id: id });
      res.render('pelanggan/edit', {
        pelanggan,
        title: 'Halaman Edit Pelanggan',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pelanggan');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { nama, alamat, noTelepon } = req.body;

      await Pelanggan.findOneAndUpdate(
        { _id: id },
        { nama, alamat, noTelepon }
      );

      req.flash('alertMessage', 'Berhasil Mengubah Bank');
      req.flash('alertStatus', 'success');

      res.redirect('/pelanggan');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pelanggan');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Pelanggan.findOneAndRemove({ _id: id });

      req.flash('alertMessage', 'Berhasil Menghapus Pelanggan');
      req.flash('alertStatus', 'success');

      res.redirect('/pelanggan');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pelanggan');
    }
  },
};
