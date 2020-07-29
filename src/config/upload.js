import multer from 'multer'
import path from 'path'

module.exports = {
  // eslint-disable-next-line new-cap
  storage: new multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(req, file, cb) {
      cb(null, file.originalname)
    },
  }),
}
