const fs = require('fs');
const path = require('path');

let permisos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../permisos.json"),"utf-8"))

module.exports = {
    index:(req,res)=>{
        console.log(permisos)
        res.render("index",{permisos:permisos})
    }
}