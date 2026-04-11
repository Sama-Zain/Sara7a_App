import multer from "multer";
import path from "path";
import fs from "fs";

export const localFile = ({ customPath = "general" }={}) => {
  const basePath = `uploads/${customPath}`;

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let userBasePath = basePath;
      if (req.user?._id) userBasePath = path.join(basePath, req.user?._id.toString());
      const fullPath = path.resolve(`./Src/${userBasePath}`);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      const uniqueFile =
        Date.now() + "_" + Math.random() + "_" + file.originalname;
        file.finalPath=`${basePath}/${req.user?._id.toString()}/${uniqueFile}`;
      cb(null, uniqueFile);
    },
  });
  return multer({ storage }); //middleware
};
//uploada/users/_id/file
