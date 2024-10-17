const { version } = require('joi');
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        org_id: { type: DataTypes.STRING, allowNull: false },
        warehouse: { type: DataTypes.STRING, allowNull: false },
        field_name: { type: DataTypes.STRING, allowNull: false },
        edited_name: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false },
        version: { type: DataTypes.STRING, allowNull: true },
    };



    return sequelize.define('custom', attributes);
}