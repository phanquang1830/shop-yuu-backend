import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize (
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || localhost,
        port: parseInt(process.env.DB_PORT) || 3306,
        dialect: 'mysql',
        logging: process.env.DB_LOGGING === 'true' ? console.log : false,

        // Cấu hình mặc định các model
        define: {
            freezeTableName: true, //Không tự đổi tên table thành số nhiều
            timestamps: false // Không tự động  tạo 2 trường createAt & updatedAt
        },

        pool: {
            max: parseInt(process.env.DB_POOL_MAX) || 10, // Số connect tối đa
            min: parseInt(process.env.DB_POOL_MIN) || 0, // Số connect tối thiểu
            acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000, // Thòi gian tối đa sequelize cố gắng 
                                                                    // lấy 1 connect trước khi báo lỗi (ms)
            idle: parseInt(process.env.DB_POOL_IDLE) || 10000, // Thời gian tối đa 1 connect rảnh trước khi bị đóng (ms)
        }
    }
)

sequelize
    .authenticate()
    .then(() =>{
        console.log('Database connected!')
    })
    .catch(err =>{
        console.log('Error to connect Database', err)
    })

export default sequelize