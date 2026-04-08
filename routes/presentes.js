const express = require("express")
const router = express.Router()
const db = require("../db")

/* LISTAR PRESENTES */

router.get("/", async (req,res)=>{

try{

const result = await db.query(
"SELECT * FROM presentes ORDER BY id"
)

res.json(result.rows)

}catch(err){

console.error(err)
res.status(500).json({erro:"Erro ao buscar presentes"})

}

})

/* ESCOLHER PRESENTE */

router.post("/:id/escolher", async (req,res)=>{

try{

const id = req.params.id
const { nome } = req.body

const result = await db.query(
`UPDATE presentes
SET escolhido = true,
escolhido_por = $1
WHERE id = $2 AND escolhido = false
RETURNING *`,
[nome,id]
)

if(result.rowCount === 0){

return res.status(400).json({
erro:"Este presente já foi escolhido"
})

}

res.json({status:"ok"})

}catch(err){

console.error(err)
res.status(500).json({erro:"Erro ao escolher presente"})

}

})

module.exports = router