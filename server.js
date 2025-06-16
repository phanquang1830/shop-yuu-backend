import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';

import { notFound, errorHandler } from "./middlewares/errorHandler.middleware.js";
import "./models/index.model.js"
import wutheringwavesRoute from './routes/wutheringwaves.route.js'
import genshinRoute from './routes/genshin.route.js'
import lienquanRoute from './routes/lienquan.route.js'
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'

dotenv.config();

const PORT = parseInt(process.env.PORT) || 3000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL, // hoặc dùng "*" nếu chưa cần bảo mật
  credentials: true, // nếu anh gửi cookie hoặc Authorization
}));
app.use('/uploads', express.static('uploads'));

app.use('/api/wutheringwaves', wutheringwavesRoute)
app.use('/api/genshinimpact', genshinRoute)
app.use('/api/lienquan', lienquanRoute)
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () =>{
    console.log(`App listen on PORT ${PORT}`)
})