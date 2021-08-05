import express from "express";
const app = express();
import env from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import morgan from "morgan";

const isProduction = process.env.NODE_ENV === "production";

import userRouters from "./routes/auth";
import adminRouters from "./routes/admin/auth";
import categoryRouters from "./routes/category";
import productRouters from "./routes/product";
import cartRouters from "./routes/cart";
import initialData from "./routes/initialData";
import pageRouters from "./routes/page";
import addressRouters from "./routes/address";
import orderRoutes from "./routes/orders";
import adminOrderRoutes from "./routes/admin/order.routes";
import commentRoutes from "./routes/comment";

env.config();

//mongoose connect
try {
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4k7m7.mongodb.net/Cluster0?retryWrites=true&w=majority`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  );
  console.log("MongoDB connect");
} catch (error) {
  console.log(error);
}

app.use(
  isProduction ? morgan("combined", { stream: accessLogStream }) : morgan("dev")
);
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", userRouters);
app.use("/api/admin", adminRouters);
app.use("/api", categoryRouters);
app.use("/api", productRouters);
app.use("/api", cartRouters);
app.use("/api", initialData);
app.use("/api", pageRouters);
app.use("/api", addressRouters);
app.use("/api", orderRoutes);
app.use("/api", adminOrderRoutes);
app.use("/api", commentRoutes);
app.post('/upload', (req, res) => {
  console.log()
})

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
