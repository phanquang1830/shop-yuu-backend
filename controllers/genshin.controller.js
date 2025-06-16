import asyncHandler from "express-async-handler";
import { Account, AccountGIDetail, sequelize } from "../models/index.model.js";
import { NotFoundError } from "../utils/error/index.js";
import getFilteredGenshinAccounts from "../repositories/genshin.repositories.js";

// @desc Fetch All Account Genshin
// @route GET /api/genshinimpact
// @access Public
const getAllAccountGI = asyncHandler(async (req, res) => {
  const result = await getFilteredGenshinAccounts(req.query); // Gửi query xuống hàm getFilteredGenshinAccounts

  res.status(200).json({
    statusCode: 200,
    message: "Get All account genshin Successfull!",
    ...result
  });
});

// @desc Fetch single Account Genshin
// @route GET /api/genshinimpact/:id
// @access Public
const getAccountGIById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const account = await AccountGIDetail.findByPk(id, { include: Account });

  if (!account) {
    throw new NotFoundError(`Account Genshin Not Found With ID ${id}`);
  }

  return res.status(200).json({
    statusCode: 200,
    message: `Fetched Account Genshin With ID ${id} Successfully`,
    account: account,
  });
});

// @desc Create Account Genshin
// @route POST /api/genshinimpact
// @access Private
const createAccountGI = asyncHandler(async (req, res) => {
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

    // Thông tin chi tiết Acc GI
    server,
    adventure_rank,
    world_level,
    limited_characters,
    limited_weapons,
    primogems,
    intertwined_fate,
    acquaint_fate,
    login_method,
  } = req.body;

  // Bắt đầu transaction
  const t = await sequelize.transaction();

  try {
    // Tạo acc chung trước
    const newAccount = await Account.create({
      code,
      game_type: "GenshinImpact",
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
    }, {transaction: t});

    const newAccountGIDetail = await AccountGIDetail.create({
      account_gi_id: newAccount.account_id,
      server,
      adventure_rank,
      world_level,
      limited_characters,
      limited_weapons,
      primogems,
      intertwined_fate,
      acquaint_fate,
      login_method,
    }, {transaction: t});

    await t.commit();

    res.status(201).json({
      statusCode: 201,
      message: "Genshin Impact Account Created!",
      account: newAccount,
      detail: newAccountGIDetail,
    });
  } catch (error) {
    // Nếu có lỗi rollback transaction
    await t.rollback();
    throw error;
  }
});

// @desc Update Account Genshin
// @route PUT /api/genshinimpact/:id
// @access Private
const updateAccountGI = asyncHandler(async (req, res) =>{
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

    // Thông tin chi tiết Acc GI
    server,
    adventure_rank,
    world_level,
    limited_characters,
    limited_weapons,
    primogems,
    intertwined_fate,
    acquaint_fate,
    login_method,
    } = req.body

    const t = await sequelize.transaction();

    try {
        const account = await Account.findByPk(id, {transaction: t});
        const detail = await AccountGIDetail.findOne({
            where: {account_gi_id: id},
            transaction: t
        });

        if(!account || !detail) {
            throw new NotFoundError(`Account Genshin Not Found With ID ${id}`)
        }

        await account.update({
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
        }, {transaction: t})

        await detail.update({
            server,
            adventure_rank,
            world_level,
            limited_characters,
            limited_weapons,
            primogems,
            intertwined_fate,
            acquaint_fate,
            login_method,
        }, {transaction: t})

        await t.commit();

        res.status(200).json({
            statusCode: 200,
            message: `Account Genshin Updated With ID ${id}`,
            account: account,
            detail: detail
        })

    } catch (error) {
        await t.rollback();
        throw error
    }
})

// @desc Delete Account Genshin
// @route DELETE /api/genshinimpact/:id
// @access Private
const deleteAccountGI = asyncHandler(async (req, res) =>{
    const { id } = req.params;

    const account = await AccountGIDetail.findByPk(id, {inclue: Account});

    if (!account) {
        throw new NotFoundError(`Account Genshin Not Found With ID ${id}`)
    };

    await account.destroy();

    res.status(200).json({
        statusCode: 200,
        message:   `Account Genshin Deleted With ID ${id}`
    })
})

export {
    getAllAccountGI,
    getAccountGIById,
    createAccountGI,
    updateAccountGI,
    deleteAccountGI
}