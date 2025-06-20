import { Op } from "sequelize";

// Hàm các điều kiện lọc của acc liên quân
const buildLienQuanQuery = (query) =>{
    const where = {};

    if(query.keyword) {
        const keyword = query.keyword.trim().toLowerCase();

        where[Op.or] = [
            { rank: { [Op.like]: `%${keyword}%` }},
            { level: isNaN(Number(keyword)) ? undefined : Number(keyword)},
        ].filter((condition) => !Object.values(condition).includes(undefined));
    }

    if(query.rank) {
        // Không phân biệt hoa thường 
        where.rank = {
            [Op.like]: query.rank.trim().toLowerCase()
        }
    }

    if(query.level) {
        where.level = Number(query.level)
    }

    if(query.hero_count) {
        where.hero_count = Number(query.hero_count)
    }

    if(query.skin_count) {
        where.skin_count = Number(query.skin_count)
    }

    return where
}

export default buildLienQuanQuery