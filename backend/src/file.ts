import express from 'express';
import authRoutes from './routes/auth-routes';
import productsRoutes from './routes/products-routes';
import ordersRoutes from './routes/orders-routes';
import adminRoutes from './routes/admin-route';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes)

app.use('/api/auth', authRoutes);

app.use('/api/products', productsRoutes);

app.use('/api/orders', ordersRoutes);


const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});