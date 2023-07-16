const Nominal = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      const nominal = await Nominal.find();
      res.render('admin/nominal/view_nominal', {
        nominal,
        alert,
        title: 'Halaman Nominal',
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/nominal/create', {
        title: 'Halaman Tambah Nominal',
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { coinName, coinQuantity, price } = req.body;
      const nominal = await Nominal.create({ coinName, coinQuantity, price });

      req.flash('alertMessage', 'Berhasil menambahkan data nominal');
      req.flash('alertStatus', 'success');

      res.redirect('/nominal');
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const nominal = await Nominal.findOne({ _id: id });

      res.render('admin/nominal/edit', {
        nominal,
        title: 'Halaman Edit Nominal',
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { coinName, coinQuantity, price } = req.body;
      await Nominal.findOneAndUpdate(
        {
          _id: id,
        },
        {
          coinName,
          coinQuantity,
          price,
        }
      );

      req.flash('alertMessage', 'Berhasil mengubah data nominal');
      req.flash('alertStatus', 'success');

      res.redirect('/nominal');
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Nominal.findOneAndRemove({
        _id: id,
      });

      req.flash('alertMessage', 'Berhasil menghapus data nominal');
      req.flash('alertStatus', 'success');

      res.redirect('/nominal');
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
};
