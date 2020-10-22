'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here  
      Book.belongsToMany(models.User, { through: models.UserBook })
     
    }

    getFormatDate() {
      return this.released_date.toDateString()
    }

    getReleaseDate() {
      return this.released_date.toISOString().split("T")[0]
    }

    static subTotal() {
      return 
    }


  };
  Book.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title must be input!!"
        }
      }
    },
    released_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: "Released Date must be input!!"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Stock Date must be input!!"
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Author must be input!!"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Price must be input!!"
        }
      }
    },
  },
   {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};