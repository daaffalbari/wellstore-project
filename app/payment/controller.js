const Payment = require('./model');
const Bank = require('../bank/model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const payment = await Payment.find().populate('banks');

      res.render('admin/payment/view_payment', {
        payment,
        alert,
      });
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  viewCreate: async (req, res) => {
    try {
      const banks = await Bank.find();
      res.render('admin/payment/create', {
        banks,
      });
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { banks, type } = req.body;

      const payment = await Payment.create({ banks, type });

      req.flash('alertMessage', 'Berhasil menambahkan data pembayaran');
      req.flash('alertStatus', 'success');
      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findOne({ _id: id }).populate('banks');
      const banks = await Bank.find();

      res.render('admin/payment/edit', {
        payment,
        banks,
      });
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { banks, type } = req.body;

      const payment = await Payment.findOneAndUpdate(
        {
          _id: id,
        },
        {
          banks,
          type,
        }
      );

      req.flash('alertMessage', 'Berhasil mengubah data pembayaran');
      req.flash('alertStatus', 'success');
      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findOneAndRemove({ _id: id });

      req.flash('alertMessage', 'Berhasil menghapus data pembayaran');
      req.flash('alertStatus', 'success');
      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      let payment = await Payment.findOne({ _id: id });
      const status = payment.status === 'Y' ? 'N' : 'Y';

      payment = await Payment.findOneAndUpdate(
        {
          _id: id,
        },
        {
          status,
        }
      );

      req.flash('alertMessage', 'Berhasil mengubah status pembayaran');
      req.flash('alertStatus', 'success');
      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `Error: ${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
};
