import { ObjectId } from "mongodb"
import { getDb } from "../database/db.js"
import { createToken, verifyToken } from "../util/token.js"

const cookieConfig = {
    httpOnly: true,
    sameSite: 'none',
    secure: true
}

export const login = async (req, res) => {
    const user = req.body
    const db = await getDb()
    const result = await db.collection('user').findOne({ email: user.email })
    if (result === null || result.password !== user.password) res.status(401).end()
    else {
        const token = createToken(result)
        res.cookie('token', token, cookieConfig)
        res.status(200).end()
    }

}

export const register = async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        profilePicture: req.body.profilePicture,
        registeredAt: new Date()
    }



    const db = await getDb()
    const result = await db.collection('user').insertOne(user)
    console.log(result);
    res.status(200).end()

}


export const baseUser = async (req, res) => {
    const token = req.cookies.token
    const db = await getDb()
    try {
        const result = verifyToken(token)
        console.log(result);
        const dbUser = await db.collection('user').findOne({ _id: new ObjectId(result.user) }, { email: 1 })
        res.status(200).json(dbUser)
    } catch (err) {
        console.error(err)
        res.status(401).end()
    }


}