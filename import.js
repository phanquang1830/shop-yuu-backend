import fs from "fs";
import path from "path";
import sequelize from "./config/db.js"; // đường dẫn đúng tới file anh đã viết

const sqlPath = path.join(process.cwd(), "shop-yuu.sql");

try {
  const sql = fs.readFileSync(sqlPath, "utf8");

  await sequelize.query(sql);
  console.log("✅ Import thành công dữ liệu từ shop-yuu.sql vào MySQL Railway!");
  process.exit(0);
} catch (err) {
  console.error("❌ Lỗi khi import SQL:", err.message);
  process.exit(1);
}
