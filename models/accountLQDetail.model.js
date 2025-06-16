import { DataTypes } from "sequelize";

export default (sequelize) =>{
    const AccountLQDetail = sequelize.define('AccountLQDetail', {
        account_lq_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false 
        },
        rank: {
            type: DataTypes.STRING(50)
        },
        level: {
            type: DataTypes.INTEGER
        },
        hero_count: {
            type: DataTypes.INTEGER
        },
        skin_count: {
            type: DataTypes.INTEGER
        }
    }, 
    {
        tableName: 'accounts_lq_details'
    });
    return AccountLQDetail
}