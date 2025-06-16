import buildLienQuanQuery from "../utils/queryBuilders/lienquan.builder.js";
import buildQueryOptions from "../utils/buildQueryOptions.js";
import { Account, AccountLQDetail } from "../models/index.model.js";

const getFilteredLienquanAccounts = async (query) =>{
    const { where, order, offset, limit, page} = buildQueryOptions(query, buildLienQuanQuery, "rank");

    const { count, rows } = await AccountLQDetail.findAndCountAll({
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
export default getFilteredLienquanAccounts