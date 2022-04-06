const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class Trail extends Model { }



Trail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true
    },

    trail_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    city_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    lat: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    lon: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    trail_img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    animal_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'animal',
        key: 'id'
      }
    },
    trail_info: {
      type: DataTypes.STRING,
      allowNull: true,
      isURL: true
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'trail'
  }
)

module.exports = Trail