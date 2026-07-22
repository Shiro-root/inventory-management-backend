import bcrypt, { compare } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient({});

export const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username dan password wajib diisi!',
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      message: 'Registrasi berhasil!', 
      data: newUser,
    });
  } catch (error) {
    return next(error);
  }
};

export const login  = async (req, res, next) =>{
  try{
   
    const {username, password} = req.body;

    if (!username || !password){
      return res.status(400).json({
        message:  'Username dan Password Wajib di isi !',
      });
    }

    const user = await prisma.user.findUnique({
      where: {username},
    });

    if (!user){
      return res.status(401).json({
        message: 'Username tidak ditemukan',
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid){
      return res.status(401).json({
        message: 'Username atau Password salah!',
      })
    }

     const token =   jwt.sign
    ({id: user.id,
      username: user.username,
      role: user.role}, 
      process.env.JWT_SECRET, 
      {expiresIn: '1d'});

    return res.status(200).json ({
      message : 'Login Berhasil !',
      token,
      data: {
        id: user.id,
        username: user.username,
        role: user.role,

      },
    });
  }catch (error){
    return next(error);
  }
};