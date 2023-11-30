import multer from "multer";
import path from "path";
import CustomErrorHandler from "../../services/CustomErrorHandler";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}- ${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`; //formula to generate unique name

    cb(null, uniqueName);
  },
});

const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image");

const productController = {
  async store(req, res, next) {
    /* Multipart form data */

    handleMultipartData(req, res, (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError(err.message));
      }
      console.log(req.file);

      res.json({})

    //   const filePath = req.file.path;
    });
  },
};
export default productController;
