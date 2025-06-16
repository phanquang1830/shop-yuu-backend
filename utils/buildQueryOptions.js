const buildQueryOptions = (query, buildWhere, defaultSortBy = "created_at") =>{
    const page = parseInt(query.page) || 1; // Trang hiện tại 
    const limit = parseInt(query.limit) || 8; // Số lượng sản phẩm trên 1 trang 
    const offset = (page - 1) * limit // Bỏ qua bao nhiêu sản phẩm

    const sortBy = query.sortBy || defaultSortBy;
    const order = [[sortBy, query.order === 'asc' ? 'ASC' : 'DESC']];

    const where = buildWhere(query);

    return {where, order, offset, limit, page};

}

export default buildQueryOptions