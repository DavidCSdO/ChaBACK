const express = require("express");
const cors = require("cors");

const presentesRoutes = require("./routes/presentes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/presentes", presentesRoutes);

// Rota básica pra teste (importante no Render)
app.get("/", (req, res) => {
  res.send("API do Chá de Panela está rodando 🚀");
});

// Porta dinâmica (OBRIGATÓRIO no Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});