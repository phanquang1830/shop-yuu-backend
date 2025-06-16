import buildGenshinQuery from '../utils/queryBuilders/genshin.builder.js'
import buildQueryOptions from '../utils/buildQueryOptions.js'
import { Account, AccountGIDetail } from '../models/index.model.js';

// Hàm xử lý lấy danh sách tài khoản Genshin có lọc, phân trang, sắp xếp
const getFilteredGenshinAccounts = async (query) =>{
    const {where, order, offset, limit, page} = buildQueryOptions(query, buildGenshinQuery, "adventure_rank");

    const { count, rows } = await AccountGIDetail.findAndCountAll({
        where, // where: điều kiện lọc (server, AR, v.v.)
        order, // order: sắp xếp theo field nào đó (ví dụ: adventure_rank desc)
        offset, // offset & limit: phân trang
        limit,
        include: Account // include: kèm dữ liệu bảng Account (tài khoản chung)
    })

    return {
        totalAccount: count,// total: tổng số record thỏa điều kiện
        currentPage: page, // page: trang hiện tại
        totalPage: Math.ceil(count/limit), // totalPage: tổng số trang
        accounts: rows // accounts: mảng dữ liệu chi tiết các tài khoản Genshin
    }
}

export default getFilteredGenshinAccounts