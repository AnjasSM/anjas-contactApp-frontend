const express = require("express")
const app = express()

const port = 3000;

app.listen(port, () => {
    console.log(`server running on port : ${port}`)
})

app.use(express.static(__dirname))

app.get("/",(req,res,next) => {
    res.sendfile("index")
});

app.get("/signup",(req,res,next) => {
    res.sendfile("signup")
});

app.get("/signin",(req,res,next) => {
    res.sendfile("signin")
});