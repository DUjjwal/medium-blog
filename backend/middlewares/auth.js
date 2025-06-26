import jwt from "jsonwebtoken"
import dotenv from "dotenv/config"
import { PrismaClient } from '../generated/prisma/index.js'


export const auth = async (req, res, next) => {
    const prisma = new PrismaClient()
    const token = req.header("Authorization")?.replace("Bearer ","")

    if(!token) {
        return res.status(200).json({
            status: 400,
            message: "token not found"
        })
    }


    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: decodedToken.id
            }
        })

        req.body.authorId = user.id
        
        if(user)
            return next()
    }
    catch(error) {
        return res.status(200).json({
            status: 400,
            message: "DB Error2"
        })
    }

    return res.status(200).json({
        status: 400,
        message: "Invalid Token"
    })
}


export const auth2 = async (req, res, next) => {
    const prisma = new PrismaClient()
    const token = req.header("Authorization")?.replace("Bearer ","")

    if(!token) {
        return res.status(200).json({
            status: 400,
            message: "token not found"
        })
    }


    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: decodedToken.id
            }
        })

        
        
        if(user)
            return next()
    }
    catch(error) {
        return res.status(200).json({
            status: 400,
            message: "DB Error2"
        })
    }

    return res.status(200).json({
        status: 400,
        message: "Invalid Token"
    })
}