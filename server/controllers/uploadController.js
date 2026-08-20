const cloudinary = require("../config/cloudinary");

const uploadImages = async (req, res) => {
  try {
    const filesToUpload = req.files || (req.file ? [req.file] : []);

    if (filesToUpload.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded."
      });
    }

    const uploadedImages = [];

    for (let file of filesToUpload) {
      // file.path use karein jo local folder ka path point karta hai
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "shopsphere"
      });

      uploadedImages.push({
        url: result.secure_url,
        publicId: result.public_id,
        localPath: file.path // Aapki tracking ke liye response mein local path bhi milega
      });
    }

    res.status(200).json({
      success: true,
      message: "Images saved locally and uploaded to Cloudinary successfully!",
      images: uploadedImages
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message
    });
  }
};

module.exports = {
  uploadImages
};
