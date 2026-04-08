const express = require("express")
const cors = require("cors")

const presentesRoutes = require("./routes/presentes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/presentes",presentesRoutes)

app.listen(3000,()=>{

console.log("API rodando na porta 3000")

})