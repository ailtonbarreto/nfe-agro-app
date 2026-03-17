import express from "express";
import path from "path";

const app = express();

// Servir arquivos estáticos
app.use(express.static("."));

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "index.html"));
});

app.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001");
});

