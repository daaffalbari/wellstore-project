const Category = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      res.render('admin/category/view_category', {
        title: 'Category',
      });
    } catch (error) {
      console.log(error);
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/category/create');
    } catch (error) {
      console.log(error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;
      console.log(name);
      // let category = await Category({name});
      const category = await Category.create({ name });
      // await category.save();
      res.redirect('/category');
    } catch (error) {
      console.log(error);
    }
  },
};
