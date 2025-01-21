const express = require("express");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandle } = require("./middlewares/errorMiddleware");
const connectDB = require("./utils/db");
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
connectDB();
app.use(express.json());
app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandle);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
