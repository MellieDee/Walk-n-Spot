const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create  Animal model
class Animal extends Model {
}

Animal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    animal_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  // 2nd param of init
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'animal'
  }
)

module.exports = Animal;