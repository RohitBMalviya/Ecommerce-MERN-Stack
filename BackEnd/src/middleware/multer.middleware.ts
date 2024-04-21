import multer from "multer";

const storage = multer.diskStorage({
  destination: function (_request, _file, callback) {
    callback(null, "./public/temp");
  },
  filename: function (_request, file, callback) {
    callback(null, file.originalname);
  },
});

export const upload = multer({ storage });
