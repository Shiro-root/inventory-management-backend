import prisma from "../config/prisma.js"


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
    try {
        const { id } = req.params
        const readSpesifikCategory = await prisma.category.findUnique({
            where: { id: Number(id) }
        })

        if (!readSpesifikCategory) {
            return res.status(404).json({
                error: 'Data tidak di temukan'
            });
        }
        return res.status(200).json(readSpesifikCategory);
    } catch (error) {
        console.error('Gagal menampilkan data Kategori:', error);
        return res.status(500).json({
            error: 'Terjadi kesalahan pada server'
        });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body

        if (!name) {
            return res.status(400).json({
                error: 'Nama Category tidak boleh kosong !',
            });
        }
        const updateCategories = await prisma.category.update({
            where: { id: Number(id) },
            data: { name },
        })

        return res.status(200).json(updateCategories);
    } catch (error) {

        if (error.code === 'P2025') {
            return res.status(404).json({
                error: 'Data tidak di temukan',
            });
        }

        console.error('Gagal memperbarui data Kategori:', error);
        return res.status(500).json({
            error: 'Terjadi kesalahan pada server'
        });

    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const categoryDeleted = await prisma.category.delete({
            where: { id: Number(id) },
        });

         
        return res.status(200).json({
            message: 'Data berhasil di hapus!'
        });
    } catch (error){
        if (error.code === 'P2025'){
            return res.status(404).json({
                error: 'Data tidak di temukan'
            });
        }

        if (error.code === 'P2003'){
        return res.status(409).json({
            error: 'Data masih di gunakan'
        });
       }
        console.error('Gagal menghapus data Kategori:', error);
        return res.status(500).json({
            error: 'Terjadi kesalahan pada server'
        });

      
         
    }
}
