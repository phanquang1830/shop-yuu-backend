import buildQueryOptions from "../utils/buildQueryOptions.js";
import buildWutheringWavesQuery from "../utils/queryBuilders/wutheringwaves.builder.js";
import { Account, AccountWWDetail } from "../models/index.model.js";

const getFilteredWutheringWavesAccounts = async (query) =>{
    const { where, order, offset, limit, page } = buildQueryOptions(query, buildWutheringWavesQuery, "union_level")

    const { count, rows } = await AccountWWDetail.findAndCountAll({
        where,
        order,
        offset,
        limit,
        include: Account
    })

    return {
        totalAccount: count,// total: tổng số record thỏa điều kiện
        currentPage: page, // page: trang hiện tại
        totalPage: Math.ceil(count/limit), // totalPage: tổng số trang
        accounts: rows // accounts: mảng dữ liệu chi tiết các tài khoản Genshin
    }
}

export default getFilteredWutheringWavesAccounts