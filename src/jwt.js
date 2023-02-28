require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateAccessToken = (email) => {
   const result = jwt.sign({data: email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
   return result
}

const generateRefreshToken = (email) => {
   const result = jwt.sign({data: email}, process.env.REFRESH_TOKEN_SECRET)
   return result
}

const generatePermanentToken = (email) => {
   const result = jwt.sign({data: email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1000 * 1000 })
   return result
}

module.exports = {
   generateAccessToken,
   generateRefreshToken,
   generatePermanentToken
}
