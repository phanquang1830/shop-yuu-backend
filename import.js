import fs from 'fs/promises';
import sequelize from './config/db.js'; // Đường dẫn tới file kết nối Sequelize của anh

(async () => {
  try {
    console.log('👉 Đang đọc file SQL...')
    const sql = await fs.readFile('./data.sql', 'utf-8');

    // Tách từng câu SQL theo dấu chấm phẩy
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📦 Có ${statements.length} câu SQL sẽ được thực thi:`);

    for (const [i, statement] of statements.entries()) {
      try {
        await sequelize.query(statement);
        console.log(`✅ Lệnh ${i + 1} chạy xong`);
      } catch (err) {
        console.error(`❌ Lỗi ở lệnh ${i + 1}:`, statement);
        console.error(err.message);
        break; // Nếu 1 câu lỗi thì dừng lại luôn
      }
    }

    console.log('🎉 Đã import xong dữ liệu!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi khi đọc/chạy file SQL:', err.message);
    process.exit(1);
  }
})();
