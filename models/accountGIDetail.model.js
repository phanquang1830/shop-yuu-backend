import { DataTypes } from "sequelize";

export default (sequelize) =>{
    const AccountGIDetail = sequelize.define('AccountGIDetail', {
        account_gi_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        server: {
            type: DataTypes.STRING(50)
        },
        adventure_rank: {
            type: DataTypes.INTEGER
        },
        world_lever: {
            type: DataTypes.INTEGER
        },
        limited_characters: {
            type: DataTypes.TEXT
        },
        limited_weapons: {
            type: DataTypes.TEXT
        },
        primogems: {
            type: DataTypes.INTEGER
        },
        intertwined_fate: {
            type: DataTypes.INTEGER
        },
        acquaint_fate: {
            type: DataTypes.INTEGER
        },
        login_method: {
            type: DataTypes.STRING(100)
        }
    }, 
    {
        tableName: 'account_gi_details'
    });

    return AccountGIDetail
}