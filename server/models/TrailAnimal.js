// // imp primary parts of sequelize lib
const { Model, DataTypes } = require('sequelize');

// // import db connection from config
const sequelize = require('../config/connection');


// // Initialize model (table) by extending off Seq Model class
class TrailAnimal extends Model { }

// //create Junction Model/join/Through Table

TrailAnimal.init(
  // define columns
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    trail_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'trail',
        key: 'id'
      }
    },
    animal_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'animal',
        key: 'id'
      }
    },
    sighting: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }

  },
  // 2nd param of init
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'trail_animal',
  }
);

module.exports = TrailAnimal;