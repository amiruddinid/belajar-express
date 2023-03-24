const { Motor } = require("../../../models");

module.exports = {
  list(req, res) {
    Motor.findAll()
      .then((motors) => {
        res.status(200).json({
          status: "OK",
          data: {
            motors,
          },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  create(req, res) {
    Motor.create({
        model: req.body.model,
        manufactur: req.body.manufactur,
        foto: req.body.foto,
        harga_sewa: req.body.harga_sewa
    })
      .then((motor) => {
        res.status(201).json({
          status: "OK",
          data: motor,
        });
      })
      .catch((err) => {
        res.status(201).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  update(req, res) {
    const motor = req.motor;

    motor
      .update(req.body)
      .then(() => {
        res.status(200).json({
          status: "OK",
          data: motor,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  show(req, res) {
    const motor = req.motor;

    res.status(200).json({
      status: "OK",
      data: motor,
    });
  },

  destroy(req, res) {
    req.motor
      .destroy()
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  setMotor(req, res, next) {
    Motor.findByPk(req.params.id)
      .then((motor) => {
        if (!motor) {
          res.status(404).json({
            status: "FAIL",
            message: "Motor not found!",
          });

          return;
        }

        req.motor = motor;
        next()
      })
      .catch((err) => {
        res.status(404).json({
          status: "FAIL",
          message: "Motor not found!",
        });
      });
  },
};
