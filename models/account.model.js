import { DataTypes} from "sequelize";

export default (sequelize) =>{
    const Account = sequelize.define('Account', {
        account_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        game_type: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
        },
        status: {
            type: DataTypes.ENUM('đã bán', 'chưa bán'),
            defaultValue: 'chưa bán'
        },
        account_information: {
            type: DataTypes.STRING(100)
        },
        img_url: {
            type: DataTypes.TEXT
        },
        username: {
            type: DataTypes.STRING(100)
        },
        password: {
            type: DataTypes.STRING(100)
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        discount_price: {
            type: DataTypes.INTEGER
        },
        discount_note: {
            type: DataTypes.STRING(255),
        },
        discount_expire_at: {
            type: DataTypes.DATE
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, 
    {
        tableName: 'accounts',
    });
    return Account
};