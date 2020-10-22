'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserBook.belongsTo(models.User)
      UserBook.belongsTo(models.Book)
    }
  };
  UserBook.init({
  
    UserId: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER,
    return_date: DataTypes.DATE,
    booking_date: DataTypes.DATE,
    flag_return: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserBook',
  });
  UserBook.beforeCreate((instance, option) => {
    instance.return_date = new Date(
        new Date().getFullYear(),
        new Date().getMonth(), 
        new Date().getDate() + 8
    )
  }) 
  return UserBook;
};