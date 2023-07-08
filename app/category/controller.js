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
};
