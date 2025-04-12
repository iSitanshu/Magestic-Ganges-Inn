import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

//routes import
import userRouter from './routes/user.routes.js'
//routes declaration
app.use("/api/v1/users", userRouter)


import roomRouter from './routes/room.router.js'

app.use("/api/v1/rooms", roomRouter)


import infoRouter from './routes/info.routes.js'

app.use("/api/v1/info", infoRouter)

export { app }
