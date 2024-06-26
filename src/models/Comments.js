'use strict';

const { Sequelize, DataTypes } = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userid: {
        type: DataTypes.STRING(15), // 변경된 부분
        allowNull: false,
      },
      postid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Comment',
      tableName: 'comments',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(index) {
    this.belongsTo(index.Post, { foreignKey: 'postid', targetKey: 'id' });
    this.belongsTo(index.User, { foreignKey: 'userid', targetKey: 'userid' }); // 변경된 부분
  }
}
