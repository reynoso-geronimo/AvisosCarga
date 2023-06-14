const fs = require('fs');
const path = require('path');

let permisos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../permisos.json"),"utf-8"))
let queue = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../queue.json"),"utf-8"))
module.exports = {
    index:(req,res)=>{
        
        res.render("index",{permisos:permisos, queue:queue})
    },
    nuevo:(req,res)=>{
        res.render("nuevo")
    },
    agregar:(req,res)=>{
     
      
        queue= [...queue,req.body]
        fs.writeFileSync(path.resolve(__dirname, "../../queue.json"),JSON.stringify(queue),null,2)
        res.redirect("/")
    }
}