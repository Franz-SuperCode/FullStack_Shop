import jwt from 'jsonwebtoken'

export const createToken = (user) => {
    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, { expiresIn: '10min' })
    return token
}

export const verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
}