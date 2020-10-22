'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Book, { through: models.UserBook })
      
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Input username must be required!!"
        }
      }
    },
    password: DataTypes.STRING,
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Input address must be required!!"
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING, 
      validate: {
        notEmpty: {
          msg: "Input Phone Number must be required!!"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Input Email must be required!!"
        },
        isEmail: {
          msg: "Enter the correct email format"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};