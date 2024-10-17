const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        org_id: { type: DataTypes.STRING, allowNull: false },
        warehouse: { type: DataTypes.STRING, allowNull: false },
        bin_id: { type: DataTypes.STRING, allowNull: false },
        storage_type: { type: DataTypes.STRING, allowNull: false },
        storage_sec: { type: DataTypes.STRING, allowNull: false },
        stock_type: { type: DataTypes.STRING, allowNull: true },

    };

    

    return sequelize.define('bin', attributes);
}