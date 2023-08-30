'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class content_blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  content_blog.init({
    project_name: DataTypes.STRING,
    author_name: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    description: DataTypes.STRING,
    technologies: DataTypes.JSONB,
    input_img: DataTypes.STRING,
    durasi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'content_blog',
  });
  return content_blog;
};