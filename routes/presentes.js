const express = require("express");
const router = express.Router();
const db = require("../db");

/* LISTAR PRESENTES */

router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM presentes ORDER BY id"
    );

    res.json(result.rows);

  } catch (err) {
    console.error("Erro ao listar presentes:", err);
    res.status(500).json({ erro: "Erro ao buscar presentes" });
  }
});


/* ESCOLHER PRESENTE */

router.post("/:id/escolher", async (req, res) => {
  try {
    const id = req.params.id;
    const { nome } = req.body;

    // validação básica
    if (!nome || nome.trim() === "") {
      return res.status(400).json({
        erro: "Nome é obrigatório"
      });
    }

    const result = await db.query(
      `UPDATE presentes
       SET escolhido = true,
           escolhido_por = $1
       WHERE id = $2 AND escolhido = false
       RETURNING *`,
      [nome, id]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({
        erro: "Este presente já foi escolhido"
      });
    }

    // retorna o item atualizado (melhor pro frontend)
    res.json(result.rows[0]);

  } catch (err) {
    console.error("Erro ao escolher presente:", err);
    res.status(500).json({ erro: "Erro ao escolher presente" });
  }
});

module.exports = router;