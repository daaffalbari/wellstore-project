const Bank = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const bank = await Bank.find();

      res.render('admin/bank/view_bank', {
        bank,
        alert,
        title: 'Halaman Bank',
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/bank/create', {
        title: 'Halaman Tambah Bank',
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, bankName, noRekening } = req.body;
      const bank = await Bank.create({ name, bankName, noRekening });

      req.flash('alertMessage', 'Berhasil menambahkan data bank');
      req.flash('alertStatus', 'success');

      res.redirect('/bank');
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findOne({ _id: id });
      res.render('admin/bank/edit', {
        bank,
        title: 'Halaman Edit Bank',
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, bankName, noRekening } = req.body;

      const bank = await Bank.findOneAndUpdate(
        {
          _id: id,
        },
        {
          name,
          bankName,
          noRekening,
        }
      );

      req.flash('alertMessage', 'Berhasil mengubah data bank');
      req.flash('alertStatus', 'success');
      res.redirect('/bank');
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findOneAndDelete({ _id: id });

      req.flash('alertMessage', 'Berhasil menghapus data bank');
      req.flash('alertStatus', 'success');
      res.redirect('/bank');
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
};
