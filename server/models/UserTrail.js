const { Model, DataTypes } = require('sequelize');
// import db connection from config
const sequelize = require('../config/connection');


// create through table model
class UserTrail extends Model { }

UserTrail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    trail_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'trail',
        key: 'id'
      }
    }
  },
  // 2nd param of init
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user-trail',
  }
);

module.exports = UserTrail;