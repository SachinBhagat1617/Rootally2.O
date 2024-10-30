const express = require("express");
const app = express();
const exerciseRoutes = require("./routes/exerciseRoutes");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/api", exerciseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
