const User = require('./model');

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const aleryMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: aleryMessage, status: alertStatus };

      res.render('admin/users/view_signin', {
        alert,
        title: 'Halaman signin',
      });
      
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('');
    }
  },
};
