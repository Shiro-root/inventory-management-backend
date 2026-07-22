import express from 'express';
import helloRoutes from './routes/helloRoutes.js';
import authRoutes from './routes/authRoutes.js';


const app = express();
const port = 3000;

app.use(express.json());
app.use('/', helloRoutes);
app.use('/api/auth', authRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message : 'Terjadi kesalahan pada server',
        error : process.env.Node_ENV === 'development' ? err.message : undefined,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Server berjalan di port ${PORT}`);
});