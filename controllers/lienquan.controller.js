import asyncHandler from "express-async-handler";
import { Account, AccountLQDetail, sequelize } from "../models/index.model.js";
import { NotFoundError } from "../utils/error/index.js";
import getFilteredLienquanAccounts from "../repositories/lienquan.repositories.js";

// @desc Fetch All Account Lien Quan
// @route GET /api/lienquan
// @access Public
const getAllAccountLQ = asyncHandler(async (req, res) => {
  const result = await getFilteredLienquanAccounts(req.query);

  res.status(200).json({
    statusCode: 200,
    message: "Get All Account Lien Quan Successfully!",
    ...result,
  });
});

// @desc Fetch Single Account Lien Quan
// @route GET /api/lienquan/:id
// @access Public
const getAccountLQById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const account = await AccountLQDetail.findByPk(id, { include: Account });

  if (!account) {
    throw new NotFoundError(`Not Found Account Lien Quan With ID ${id}!`);
  }

  res.status(200).json({
    statusCode: 200,
    message: `Fetch Account Lien Quan With ID ${id} Successfully!`,
    account: account,
  });
});

// @desc Create Account Lien Quan
// @route POST /api/lienquan
// @access Private
const createAccountLQ = asyncHandler(async (req, res) => {
  const {
    // Thông tin chung
    code,
    description,
    status,
    account_information,
    img_url,
    username,
    password,
    game_type,
    price,
    discount_price,
    discount_note,
    discount_expire_at,

    // Thông tin chi tiết của acc liên quân
    rank,
    level,
    hero_count,
    skin_count,
  } = req.body;

  const t = await sequelize.transaction();

  try {
    const newAccount = await Account.create(
      {
        code,
        description,
        status,
        account_information,
        img_url,
        username,
        password,
        game_type,
        price,
        discount_price,
        discount_note,
        discount_expire_at,
      },
      { transaction: t }
    );

    const newAccountLQDetail = await AccountLQDetail.create(
      {
        account_lq_id: newAccount.account_id,
        rank,
        level,
        hero_count,
        skin_count,
      },
      { transaction: t }
    );

    await t.commit();

    res.status(201).json({
      statusCode: 201,
      message: "Create Account Lien Quan Successfully!",
      account: newAccount,
      detail: newAccountLQDetail,
    });
  } catch (error) {
    await t.rollback();
    throw error;
  }
});

// @desc Update Account Lien Quan
// @route PUT /api/genshin/:id
// @access Private
const updateAccountLQ = asyncHandler(async (req, res) => {
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

    // Thông tin chi tiết của acc liên quân
    rank,
    level,
    hero_count,
    skin_count,
  } = req.body;

  const t = await sequelize.transaction();

  try {
    const account = await Account.findByPk(id, { transaction: t });
    const detail = await AccountLQDetail.findOne({
      where: { account_lq_id: id },
      transaction: t,
    });
    if (!account || !detail) {
      throw new NotFoundError(`Account Lien Quan Not Found With ID ${id}`);
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
        rank,
        level,
        hero_count,
        skin_count,
      },
      { transaction: t }
    );

    await t.commit();

    res.status(200).json({
      statusCode: 200,
      message: `Update Account Lien Quan Successfully With ID ${id}`,
      account: account,
      detail: detail,
    });
  } catch (error) {
    await t.rollback();
    throw error;
  }
});

// @desc Delete Account Lien Quan
// @route DELETE /api/lienquan/:id
// @access Private
const deleteAccountLQ = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const account = await AccountLQDetail.findByPk(id, { include: Account });

  if (!account) {
    throw new NotFoundError(`Not Found Account Lien Quan With ID ${id}`);
  }

  await account.destroy();

  res.status(200).json({
    statusCode: 200,
    message: `Account Lien Quan Deleted Witd ID ${id}`,
  });
});

export {
    getAllAccountLQ,
    getAccountLQById,
    createAccountLQ,
    updateAccountLQ,
    deleteAccountLQ
}