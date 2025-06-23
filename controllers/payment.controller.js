import asyncHandler from "express-async-handler";

const getQRPaymentLink = asyncHandler(async (req, res) => {
  const { amount, orderId } = req.query;

  if (!amount || !orderId) {
    return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin!" });
  }

  const bankCode = process.env.BANK_CODE;
  const accountNumber = process.env.BANK_ACCOUNT;

  // Nội dung chuyển khoản mong muốn
  const addInfo = `Chuyen khoan SHOPYUU_${orderId}`;

  //encodeURIComponent: mã hóa chuỗi thành dạng hợp lệ
  const qrURL = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(addInfo)}`;

  res.json({ qrURL });
});

export default getQRPaymentLink;
