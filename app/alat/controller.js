const Alat = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alat = await Alat.find();

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      req.res.render('alat/index', {
        alat,
        alert,
        title: 'Halaman Alat',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/alat');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('alat/create', {
        title: 'Halaman Tambah Alat',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/alat');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { namaAlat, harga } = req.body;

      let alat = await Alat({ namaAlat, harga });
      await alat.save();

      req.flash('alertMessage', 'Berhasil Menambah Alat');
      req.flash('alertStatus', 'success');

      res.redirect('/alat');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/alat');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      let alat = await Alat.findOne({ _id: id });
      res.render('alat/edit', {
        alat,
        title: 'Halaman Edit Alat',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/alat');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { namaAlat, harga } = req.body;

      await Alat.findOneAndUpdate({ _id: id }, { namaAlat, harga });

      req.flash('alertMessage', 'Berhasil Mengubah Bank');
      req.flash('alertStatus', 'success');

      res.redirect('/alat');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/alat');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Alat.findOneAndRemove({ _id: id });

      req.flash('alertMessage', 'Berhasil Menghapus Alat');
      req.flash('alertStatus', 'success');

      res.redirect('/alat');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/alat');
    }
  },
};
