import { DataTypes } from "sequelize";

export default (sequelize) =>{
    const AccountWWDetail = sequelize.define('AccountWWDetail', {
        account_ww_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        server: {
            type: DataTypes.STRING(50)
        },
        union_level: {
            type: DataTypes.INTEGER
        },
        limited_characters: {
            type: DataTypes.TEXT
        },
        limited_weapons: {
            type: DataTypes.TEXT
        },
        premium_currency: {
            type: DataTypes.STRING(100)
        },
        login_method: {
            type: DataTypes.STRING(100)
        }
    },
    {
        tableName: 'account_ww_details'
    });

    return AccountWWDetail
}