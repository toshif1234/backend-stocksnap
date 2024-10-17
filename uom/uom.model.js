const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        org_id: { type: DataTypes.STRING, allowNull: false },
        warehouse: { type: DataTypes.STRING, allowNull: false },
        uom: { type: DataTypes.STRING, allowNull: false },
        version: { type: DataTypes.STRING, allowNull: true },
    };



    return sequelize.define('uom', attributes);
}