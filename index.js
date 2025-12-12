import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import applicationRoute from "./routs/application.route.js";
import companyRoute from "./routs/company.route.js";
import jobRoute from "./routs/job.route.js";
import userRoute from "./routs/user.route.js";
import connectDB from "./utils/db.js";
dotenv.config({});

const app = express();



//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const corsOptions={
    origin:'https://job-portal-omega-black.vercel.app',
    credentials:true
}
app.use(cors(corsOptions));

const PORT=process.env.PORT || 3000;

// api's
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})