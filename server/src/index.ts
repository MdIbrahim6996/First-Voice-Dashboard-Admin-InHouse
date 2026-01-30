import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import path from "path";
import router from "./routes";
import { errorHandler, notFound } from "./middlewares/errorMiddleware";

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://172.16.32.194:4000",
            // "https://first-voice-dashboard-admin.onrender.com",
        ],
        credentials: true,
        optionsSuccessStatus: 200,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(compression());

app.use("/api/v1", router);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(path.resolve(), "../client", "dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(
            path.resolve(path.resolve(), "../client", "dist", "index.html")
        );
    });
}

//ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server Listening at PORT ${PORT}`));
