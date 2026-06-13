require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const visitorRoutes = require("./Routes/routes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.set("trust proxy", true);

app.get("/", (req, res) => {
  res.json({
    message: "HighShine visitor Api is running",
  });
});

app.use("/api", visitorRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
