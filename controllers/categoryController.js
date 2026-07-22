import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({});


export const newCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                error: 'Nama Category tidak boleh kosong !',
            });
        }
        const createdCategory = await prisma.category.create({
            data: { name, }
        });

        return res.status(201).json(createdCategory)
    } catch (error) {
        console.error('Gagal membuat kategori :', error);
        return res.status(500).json({
            error: 'Terjadi kesalahan pada server',
        });
    }

};

export const readAllCategory = async (req, res,) => {
    try {
        const readCategories = await prisma.category.findMany();
        return res.status(200).json(readCategories);

    } catch (error) {
        console.error('Gagal menampilkan data Kategori:', error);
        return res.status(500).json({
            error: 'Terjadi kesalahan pada server'
        })

    }
}

export const readCategory = async (req, res,) => {
    try{
        const {id} = req.params
        const readSpesifikCategory = await prisma.category.findUnique({
            where : {id: Number(id)}
        })

        if (!readSpesifikCategory){
            return res.status(404).json({
                error : 'Data tidak di temukan'
            });
        }
        return res.status(200).json(readSpesifikCategory);
    }catch(error){
    console.error('Gagal menampilkan data Kategori:', error);
        return res.status(500).json({
            error: 'Terjadi kesalahan pada server'
        }) ; 
    }
}
