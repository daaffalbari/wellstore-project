module.exports = {
  index: async (req, res) => {
    try {
      res.render('index', {
        title: 'Category',
      });
    } catch (error) {
      console.log(error);
    }
  },
};
