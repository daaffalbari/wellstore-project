const Category = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const category = await Category.find();

      console.log(alert);

      res.render('admin/category/view_category', {
        category: category,
        alert: alert,
      });
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/category/create');
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.create({ name });

      req.flash('alertMessage', 'Berhasil menambahkan data kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/category');
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });
      res.render('admin/category/edit', {
        category,
      });
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await Category.findOneAndUpdate({ _id: id }, { name }, { new: true });

      req.flash('alertMessage', 'Berhasil mengubah data kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/category');
    } catch (error) {
      req.flash('alertMessage', `Gagal mengubah: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOneAndRemove({ _id: id });


      req.flash('alertMessage', 'Berhasil menghapus data kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/category');
    } catch (error) {
      req.flash('alertMessage', `Gagal menghapus: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
};
