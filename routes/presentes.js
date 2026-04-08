const express = require("express")
const router = express.Router()
const db = require("../db")

router.get("/", async (req,res)=>{

const result = await db.query(
"SELECT * FROM presentes ORDER BY id"
)

res.json(result.rows)

})

router.post("/:id/escolher", async (req,res)=>{

const id = req.params.id
const { nome } = req.body

await db.query(
"UPDATE presentes SET escolhido=true, escolhido_por=$1 WHERE id=$2",
[nome,id]
)

res.json({status:"ok"})

})

module.exports = router