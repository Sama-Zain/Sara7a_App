import multer from "multer";
import path from "path";
import fs from "fs";

export const filevalidation = {
  images: ["image/png", "image/jpeg", "image/jpg"],
  videos: ["video/mp4", "video/webm", "video/ogg"],
  audios: ["audio/mp3", "audio/wav", "audio/ogg"],
  documents: ["application/pdf", "application/msword"],
};

export const localFile = ({ customPath = "general", validation = [] }={}) => {
  const basePath = `uploads/${customPath}`;

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let userBasePath = basePath;
      if (req.user?._id)
        userBasePath = path.join(basePath, req.user?._id.toString());
      const fullPath = path.resolve(`./Src/${userBasePath}`);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      const uniqueFile =
        Date.now() + "_" + Math.random() + "_" + file.originalname;
      file.finalPath = `${basePath}/${req.user?._id.toString()}/${uniqueFile}`;
      cb(null, uniqueFile);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (validation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  };
  return multer({ fileFilter, storage });
};
//uploada/users/_id/file
