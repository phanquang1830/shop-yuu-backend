import asyncHandler from "express-async-handler";
import { Account, AccountWWDetail, sequelize } from "../models/index.model.js";
import { NotFoundError } from "../utils/error/index.js";

// @desc Get All Account Wuthering waves
// @route GET /api/wutheringwaves
// @access Public
const getAllAccountWW = asyncHandler(async (req, res) => {
  const accounts = await AccountWWDetail.findAll({ include: Account });
  res.status(200).json({
    statusCode: 200,
    message: "Get All Account Wuthering Waves Successfully!",
    accounts: accounts,
  });
});

// @desc Fetch single Account Wuthering waves
// @route GET /api/wutheringwaves/:id
// @access Public
const getAccountWWById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const account = await AccountWWDetail.findByPk(id, { include: Account });

  if (!account) {
    throw new NotFoundError(`Account Wuthering Waves Not Found With ID ${id}`);
  }

  return res.json({
    statusCode: 200,
    message: "Get Account Wuthering Waves by id Successfully!",
    data: account,
  });
});

// @desc Delete Account Wuthering waves
// @route DELETE /api/wutheringwaves/:id
// @access Private
const deleteAccountWW = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const account = await AccountWWDetail.findByPk(id, { include: Account });

  if (!account) {
    throw new NotFoundError(`Account Wuthering Waves Not Found With ID ${id}`);
  }

  await account.destroy();

  res.status(200).json({
    statusCode: 200,
    message: `Account Wuthering Waves Deleted With ID ${id}` 
  });
});

// @desc Create Account Wuthering waves
// @route POST /api/wutheringwaves
// @access Private
const createAccountWW = asyncHandler(async (req, res) => {
  const {
    // Thông tin chung
    code,
    description,
    status,
    account_information,
    img_url,
    username,
    password,
    price,
    discount_price,
    discount_note,
    discount_expire_at,
    // Thông tin chi tiết WW
    server,
    union_lever,
    limited_characters,
    limited_weapons,
    premium_currency,
    login_method,
  } = req.body;

  const t = await sequelize.transaction();

  try {
    // Tạo account chung trước
    const newAccount = await Account.create(
      {
        code,
        game_type: "WutheringWaves", // hoặc lấy từ req.body nếu đa game
        description,
        status,
        account_information,
        img_url,
        username,
        password,
        price,
        discount_price,
        discount_note,
        discount_expire_at,
      },
      { transaction: t }
    );

    // Tạo chi tiết WW với account_id vừa tạo
    const newAccountWWDetail = await AccountWWDetail.create(
      {
        account_ww_id: newAccount.account_id,
        server,
        union_lever,
        limited_characters,
        limited_weapons,
        premium_currency,
        login_method,
      },
      { transaction: t }
    );

    await t.commit(); // Kết thúc transaction và lưu thay đổi

    res.status(201).json({
      statusCode: 201,
      message: "Wuthering Waves Account Created",
      account: newAccount,
      detail: newAccountWWDetail,
    });
  } catch (error) {
    await t.rollback(); // Nếu có lỗi thì rollback luôn
    throw error;
  }
});

// @desc Update Account Wuthering waves
// @route PUT /api/wutheringwaves/:id
// @access Private
const updateAccountWW = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    // Thông tin chung
    code,
    description,
    status,
    account_information,
    img_url,
    username,
    password,
    price,
    discount_price,
    discount_note,
    discount_expire_at,
    // Thông tin chi tiết WW
    server,
    union_lever,
    limited_characters,
    limited_weapons,
    premium_currency,
    login_method,
  } = req.body;

  const t = await sequelize.transaction();

  try {
    const account = await Account.findByPk(id, {transaction: t});
    const detail = await AccountWWDetail.findOne({
      where: { account_ww_id: id },
      transaction: t,
    });

    if (!account || !detail) {
      throw new NotFoundError(
        `Account Wuthering Waves Not Found With ID ${id}`
      );
    }

    await account.update(
      {
        code,
        description,
        status,
        account_information,
        img_url,
        username,
        password,
        price,
        discount_price,
        discount_note,
        discount_expire_at,
      },
      { transaction: t }
    );

    await detail.update(
      {
        server,
        union_lever,
        limited_characters,
        limited_weapons,
        premium_currency,
        login_method,
      },
      { transaction: t }
    );

    await t.commit();

    res.status(200).json({
      statusCode: 200,
      message: "Account Wuthering Waves Update Successfully",
      account: account,
      detail: detail,
    });
  } catch (error) {
    await t.rollback();
    throw error;
  }
});

export {
  getAllAccountWW,
  getAccountWWById,
  deleteAccountWW,
  createAccountWW,
  updateAccountWW,
};
