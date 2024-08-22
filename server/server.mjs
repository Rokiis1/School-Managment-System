import express from "express";

import routes from "./routes/index.mjs";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      message: "Server is healthy",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Internal Server Error, ${error}`,
    });
  }
});

app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
