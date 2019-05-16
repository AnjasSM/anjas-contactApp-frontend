const express = require("express")
const app = express()

const port = 3000;

app.listen(port, () => {
    console.log(`server running on port : ${port}`)
})

app.use(express.static(__dirname))

app.get("/",(req,res,next) => {
    res.sendfile("index.html")
})