const mongoose = require('mongoose');

let transaksiSchema = mongoose.Schema(
  {
    harga: {
      type: String,
      require: [true, 'Harga alat harus diisi'],
    },
    jumlah: {
      type: Number,
      require: [true, 'Jumlah harus diisi'],
    },
    total: {
      type: Number,
      require: [true, 'Total harus diisi'],
    },
    tanggalPeminjaman: {
      type: Date,
    },
    durasiPeminjaman: {
      type: Number,
    },
    statusAlat: {
      type: String,
      enum: ['dipinjam', 'dikembalikan', 'hilang'],
      default: 'dipinjam',
    },
    alats: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Alat',
    },
    pelanggans: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pelanggan',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaksi', transaksiSchema);
