import multer from "multer";          // Multer dùng để xử lý multipart/form-data (upload file)
import path from "path";              // Path giúp xử lý đường dẫn và phần mở rộng file

// -----------------------------
// CẤU HÌNH NƠI LƯU FILE
// -----------------------------
const storage = multer.diskStorage({
  // Định nghĩa thư mục lưu file upload
  destination: (req, file, cb) => {
    // null ở đây là không có lỗi
    //cb: callback – dùng để báo cho multer biết đường dẫn sẽ lưu file
    cb(null, "uploads/");            // Lưu vào thư mục 'uploads' ngay gốc project
  },

  // Định nghĩa tên file sau khi lưu
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);   // Lấy phần mở rộng, ví dụ: .jpg, .png
    const uniqueName = `avatar-${Date.now()}${ext}`; // Tạo tên file mới duy nhất, tránh trùng
    cb(null, uniqueName);                         // Trả về tên file mới
  },
});

// -----------------------------
// BỘ LỌC FILE (CHỈ CHO ẢNH)
// -----------------------------
// Khi người dùng upload 1 file lên, mỗi file đều có một thông tin gọi là mimetype, ví dụ:

// | File ảnh JPEG | image/jpeg |
// | File ảnh PNG | image/png |
// | File PDF | application/pdf |
// | File Word | application/vnd.openxmlformats-officedocument.wordprocessingml.document |

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    // Nếu file là ảnh thì cho phép upload
    cb(null, true);
  } else {
    // Nếu không phải ảnh, từ chối và báo lỗi
    cb(new Error("Chỉ chấp nhận file ảnh!"), false);
  }
};

// -----------------------------
// KHỞI TẠO MIDDLEWARE MULTER
// -----------------------------
const upload = multer({ storage, fileFilter }); 
// Khai báo cấu hình sử dụng multer gồm nơi lưu và lọc file

export default upload;
