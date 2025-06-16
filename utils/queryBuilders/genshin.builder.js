import { Op } from "sequelize";

const buildGenshinQuery = (query) =>{
    const where = {};

    if(query.server) {
        where.server = query.server;
    }

    if(query.adventure_rank) {
        where.adventure_rank = Number(query.adventure_rank);
    }

    if(query.world_level) {
        where.world_level = Number(query.world_level);
    }

    // Op.like: tìm từ khóa có trong đoạn text, vì limited_Characters có kiểu dữ liệu là TEXT
    if(query.limited_characters) {
        // split: chia chuỗi thành mảng split(',') cắt tại dấu ,
        const names = query.limited_characters.split(','); // ["Hutao", "Nahida"]

        //map(): duyệt mảng
        where[Op.or] = names.map(name => ({
            //trim: loại bỏ khoảng trắng ở đầu và cuối chuỗi
            limited_characters: { [Op.like]: `%${name.trim()}%` }
        }))
    }

    return where
}

export default buildGenshinQuery