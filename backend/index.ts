import express from 'express';
import 'dotenv/config'; 
import connectDb from './database/db'; 
import superRoute from './routes/superRoute';                 
import adminRoute from './routes/adminRoute';

const app = express();
const PORT = process.env.PORT ||3000;

app.use(express.json());
app.use('/super-admin',superRoute)
app.use('/admin',adminRoute)

app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port ${PORT}`);
});
