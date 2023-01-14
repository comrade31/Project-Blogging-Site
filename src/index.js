const express= require("express")
const bodyParser = require ("body-parser")
const {default:mongoose} = require ("mongoose")
const router = require("./routes/route")
const app = express()


app.use(bodyParser.json())
app.use (bodyParser.urlencoded({extended : true}))

mongoose.connect("mongodb+srv://Comrade31:B93EgLm7P9wmaRx@cluster-lithium.qso5elz.mongodb.net/Project-1",{ 
   useNewUrlParser: true}) 
.then( ()=> console.log("mongodb is connected"))
.catch(err => console.log(err))

app.use('/',router)

app.listen(3000,function(){ console.log("connected to Port 3000");})