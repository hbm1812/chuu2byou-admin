const cloudinary = require('cloudinary').v2;

// Cấu hình Cloudinary với thông tin tài khoản của bạn
cloudinary.config({
  cloud_name: 'tên-cloud',
  api_key: 'api-key',
  api_secret: 'api-secret',
});

/**
 * Hàm upload ảnh lên Cloudinary
 * @param {string} filePath - Đường dẫn đến file cần upload
 * @returns {string} - Đường dẫn URL của ảnh đã được upload
 */
const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'ten-thu-muc', // Tạo một thư mục để lưu ảnh trên Cloudinary
    });
    return result.secure_url; // Trả về đường dẫn bảo mật của ảnh
  } catch (error) {
    console.error('Lỗi khi upload lên Cloudinary:', error);
    throw error;
  }
};

module.exports = { uploadToCloudinary };
