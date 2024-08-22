import express from "express";

import routes from "./routes/index.mjs";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
