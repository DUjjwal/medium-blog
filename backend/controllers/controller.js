import { PrismaClient } from '../generated/prisma/index.js'
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
    const prisma = new PrismaClient()
    const { name, email, password } = req.body

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(user) {
        return res.status(200).json({
            status: 400,
            message: "User already exists"
        })
    }
    
    try {
        const response = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })

        const token = jwt.sign({id: response.id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY
        })
        
        return res.status(200).json({
            status: 200,
            token
        })

    }
    catch(error) {
        return res.status(200).json({
            status: 400,
            message: "DB Error"
        })
    }

    
}

export const signin =async (req, res, next) => {
    const prisma = new PrismaClient()
    const {email, password} = req.body
    
    console.log("hitting")
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if(!user) {
            return res.status(200).json({
                status: 400,
                message: "User not found"
            })
        }
        if(user.password === password) {
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRY
            })

            return res.status(200).json({
                status: 200,
                token
            })
        }
        else {
            return res.status(200).json({
                status: 400,
                message: "Incorrect password"
            })
        }
    }
    catch(error) {
        return res.status(400).json({
            status: 400,
            message: "User not found"
        })
    }
}

export const createBlog = async (req, res, next) => {
    const prisma = new PrismaClient()
    const {title, content, authorId, date} = req.body
    console.log("hittinh")
    console.log(title, content, authorId)
    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                published: false,
                authorId,
                date
            }
        })
        console.log("post-",post)
        return res.status(200).json({
            status: 200,
            id: post.id
        })
        
    }
    catch(error) {
        return res.status(400).json({
            status: 400,
            message: "DB error"
        })
    }
}

export const updateBlog = async (req, res, next) => {
    const prisma = new PrismaClient()
    const {title, content, postID} = req.body

    try {
        const post = await prisma.post.update({
            where: {
                id: postID
            },
            data: {
                title,
                content
            }
        })

        return res.status(200).json({
            status: 200,
            id: post.id
        })

    }
    catch(error) {
        return res.status(400).json({
            status: 400,
            message: "DB error"
        })
    }
}

export const getAllBlog = async (req, res, next) => {
    const prisma = new PrismaClient()
    const posts = await prisma.post.findMany({
        select: {
            title: true,
            content: true,
            author: {
                select: {
                    name: true
                }
            },
            date: true,
            id: true,
            tags: true
        }
    })

    return res.status(200).json({
        status: 200,
        posts
    })
}

export const getParticularBlog = async (req, res, next) => {
    const id = req.params.id
    const prisma = new PrismaClient()

    
    const post = await prisma.post.findUnique({
        where: {
            id
        },
        select: {
            title: true,
            content: true,
            author: {
                select: {
                    name: true
                }
            },
            date: true,
            tags: true
        }
    })

    return res.status(200).json({
        status: 200,
        post
    })
}

export const addTag = async (req, res, next) => {
    const {tag1, tag2, tag3, tag4, tag5, postId} = req.body
    console.log("hit hua")
    const prisma = new PrismaClient()
    const tag = await prisma.tags.create({
        data: {
            tag1,
            tag2,
            tag3,
            tag4,
            tag5,
            postId
        }
        
    })
    
    return res.status(200).json({
        status: 200,
        message: "success"
    })
}


