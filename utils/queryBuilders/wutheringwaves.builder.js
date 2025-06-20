import { Op } from "sequelize";

const buildWutheringWavesQuery = (query) => {
  const where = {};

  // 🔍 Tìm kiếm theo keyword (có thể là tên nhân vật, server,...)
  if (query.keyword) {
    const keyword = query.keyword.trim().toLowerCase();

    // Các trường cần kiểm tra keyword
    //Op.or: toán tử hoặc, chỉ cần 1 trong các điều kiện đúng
    //[Op.like]: `%${keyword}%`: tìm tất cả các phần tử có chứa chuỗi keyword 
    where[Op.or] = [
      { limited_characters: { [Op.like]: `%${keyword}%` } },
      { server: { [Op.like]: `%${keyword}%` } },
      { union_level: isNaN(Number(keyword)) ? undefined : Number(keyword) }, // nếu keyword là số thì cho phép lọc theo union_level
      // Lọc những điều kiện bị undefined
    ].filter((condition) => !Object.values(condition).includes(undefined));
  }

  if (query.server) {
    where.server = {
      [Op.like]: query.server.trim().toLowerCase(),
    };
  }

  if (query.union_level) {
    where.union_level = Number(query.union_level);
  }

  if (query.limited_characters) {
    const names = query.limited_characters.split(",");

    where[Op.or] = names.map((name) => ({
      limited_characters: { [Op.like]: `%${name.trim()}%` },
    }));
  }

  return where;
};

export default buildWutheringWavesQuery;
