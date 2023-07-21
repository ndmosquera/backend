import multer from 'multer';
import {dirname} from 'path'
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta,url));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + 'public/img')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage });
