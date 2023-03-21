'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Motor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Motor.init({
    model: DataTypes.STRING,
    manufactur: DataTypes.STRING,
    foto: DataTypes.TEXT,
    harga_sewa: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Motor',
  });
  return Motor;
};