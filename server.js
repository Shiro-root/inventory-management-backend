import express from 'express';
import helloRoutes from './routes/helloRoutes.js'


const app = express();
const port = 3000;

app.use('/', helloRoutes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});