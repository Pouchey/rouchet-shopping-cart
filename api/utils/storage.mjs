// --------------------------------------------------------------
//  Author:  Rouchet Théophile
//  Date:    2022
// --------------------------------------------------------------
import multer from "multer";


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');

    callback(null, name + '.png');
  }
});

const upload = multer({ storage });

export default upload;