
const Router = require("express").Router()


Router.get("/email-verify", (req,res)=>{
    res.render("emailVerify")
})

module.exports = Router;