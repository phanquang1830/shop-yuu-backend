import sequelize from "../config/db.js";

import AccountModel from "./account.model.js";
import AccountGIDetailModel from "./accountGIDetail.model.js";
import AccountLQDetailModel from "./accountLQDetail.model.js";
import AccountWWDetailModel from "./accountWWDetail.model.js";
import UserModel from "./user.model.js";
import OtpCodeModel from "./otpCode.model.js";
import contactMessageModel from "./contactMessage.model.js";
import CartModel from "./cart.model.js";
import OrderModel from "./order.model.js";

//Khởi tạo model
const Account = AccountModel(sequelize);
const AccountGIDetail = AccountGIDetailModel(sequelize);
const AccountLQDetail = AccountLQDetailModel(sequelize);
const AccountWWDetail = AccountWWDetailModel(sequelize);
const User = UserModel(sequelize);
const OtpCode = OtpCodeModel(sequelize);
const ContactMessage = contactMessageModel(sequelize);
const Cart = CartModel(sequelize);
const Order = OrderModel(sequelize);

// Thiết lập quan hệ
// Account & AccountGIDetail
Account.hasOne(AccountGIDetail, {
    foreignKey: 'account_gi_id',
    onDelete: 'CASCADE'
});
AccountGIDetail.belongsTo(Account, {
    foreignKey: 'account_gi_id'
});

// Account & AccountLQDetail
Account.hasOne(AccountLQDetail, {
    foreignKey: 'account_lq_id',
    onDelete: 'CASCADE'
});
AccountLQDetail.belongsTo(Account, {
    foreignKey: 'account_lq_id'
});

// Account & AccountWWDetail
Account.hasOne(AccountWWDetail, {
    foreignKey: 'account_ww_id',
    onDelete: 'CASCADE'
});

AccountWWDetail.belongsTo(Account, {
    foreignKey: 'account_ww_id'
});

//hasMany: mối quan hệ 1- nhiều
//User & Cart
//Một người dùng (User) có thể thêm nhiều món vào giỏ (Cart)
User.hasMany(Cart, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//Account & cart
//Một tài khoản (Account) có thể nằm trong nhiều giỏ hàng khác nhau 
Account.hasMany(Cart, {
    foreignKey: 'account_id',
    onDelete: 'CASCADE'
});
Cart.belongsTo(Account, {
  foreignKey: 'account_id'
});

// Một người dùng có thể có nhiều đơn hàng
User.hasMany(Order, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Một đơn hàng chỉ thuộc về một người dùng
Order.belongsTo(User, {
  foreignKey: 'user_id'
});


// Export lại sequelize để khi import thì import chung cho tiện
export {
    sequelize,
    Account,
    AccountGIDetail,
    AccountLQDetail,
    AccountWWDetail,
    User,
    OtpCode,
    ContactMessage,
    Cart,
    Order
}
