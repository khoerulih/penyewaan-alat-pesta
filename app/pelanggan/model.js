const mongoose = require('mongoose');

let pelangganSchema = mongoose.Schema(
  {
    nama: {
      type: String,
      require: [true, 'Nama pelanggan harus diisi'],
    },
    alamat: {
      type: String,
      require: [true, 'Alamat Pelanggan harus diisi'],
    },
    noTelepon: {
      type: String,
      require: [true, 'Nomor telepon harus diisi'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pelanggan', pelangganSchema);
