/* eslint-disable func-names */
import jwt from 'jsonwebtoken'

async function generateToken(data) {
  const token = jwt.sign(data, process.env.GLOBAL_SALT_KEY, { expiresIn: '1d' })

  return token
}

async function decodeToken(token) {
  return jwt.decode(token, process.env.GLOBAL_SALT_KEY)
}

async function authorize(req, res, next) {
  const authToken = req.body.token || req.query.token || req.headers['x-access']

  // eslint-disable-next-line consistent-return
  jwt.verify(authToken, process.env.SALT_KEY, function (error) {
    if (error) {
      res.status(401).json({
        message: 'Token Inválido',
      })
    } else {
      next()
      return res.status(202).send({ Message: 'Login validado!' })
    }
  })
}

export { generateToken, decodeToken, authorize }
