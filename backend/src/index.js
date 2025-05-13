const express = require("express");
const cors = require("cors");
const app = express();
const landRoutes = require("./routes/landRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", landRoutes);

// New default route
app.get("/", (req, res) => {
  res.send("Welcome to the Land Registry Backend!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
