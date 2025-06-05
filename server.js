import express from "express";
import dotenv from 'dotenv';

import { notFound, errorHandler } from "./middlewares/errorHandler.middleware.js";
import "./models/index.model.js"
import wutheringwavesRoute from './routes/wutheringwaves.route.js'
import genshinRoute from './routes/genshin.route.js'
import lienquanRoute from './routes/lienquan.route.js'

dotenv.config();

const PORT = parseInt(process.env.PORT) || 3000;
const app = express();

app.use(express.json());

app.use('/api/wutheringwaves', wutheringwavesRoute)
app.use('/api/genshin', genshinRoute)
app.use('/api/lienquan', lienquanRoute)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () =>{
    console.log(`App listen on PORT ${PORT}`)
})