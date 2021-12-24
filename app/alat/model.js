const mongoose = require('mongoose');

let alatSchema = mongoose.Schema(
  {
    namaAlat: {
      type: String,
      require: [true, 'Nama alat harus diisi'],
    },
    harga: {
      type: Number,
      require: [true, 'Harga harus diisi'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alat', alatSchema);
