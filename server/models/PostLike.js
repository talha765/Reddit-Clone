const { DataTypes } = require('sequelize');
const sequelize = require('../src/db');

const RequirementLike = sequelize.define('postlike', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    postId: { type: DataTypes.INTEGER, allowNull: false },
});


module.exports = RequirementLike;
