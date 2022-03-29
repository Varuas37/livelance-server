import dotenv from "dotenv";
import express from "express";
import CompositionRoot from "./CompositionRoot";

dotenv.config();
CompositionRoot.configure();

const PORT = process.env.PORT;

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", CompositionRoot.authRouter());
app.use("/jobs", CompositionRoot.jobRouter());
app.use("/profile", CompositionRoot.profileRouter());
app.use("/message", CompositionRoot.messageRouter());
app.use("/review", CompositionRoot.reviewRouter());

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
