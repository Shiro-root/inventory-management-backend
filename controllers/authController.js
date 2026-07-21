import bycrpt from "bcrypt"
import {PrismaClient} from "prisma/client";

const prisma = new PrismaClient();

export const register = async (req, res, next) => {
    try{
        const {username, password} = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                message : 'Username dan password wajib di isi!',
            });
        }
   
        const saltRounds = 10
        const hashedPassword = await bycrpt.hash(password, saltRounds);

        const newUser = await prisma.user.create ({
            data: {
                username,
                password : hashedPassword,
            },
            select: {
                id: true,
                username: true,
                createdat: true,
            },
        });
   return res.status(201).json({
    message: 'Registrasi Berhasil',
    data: newUser,
   });
   
    }catch (error) {
       return next(error);
    }
};