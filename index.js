const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const ejs = require("ejs")

const app = express()

app.set("view engine", "ejs")

mongoose.connect("mongodb://localhost: 27017/medDB", {useNewUrlParser: true})

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

const doctorSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  medtype: String
})

const Doctor = mongoose.model("doctor", doctorSchema)

app.get('/doctor', function(req, res){
  res.render("doctor")
})

app.post('/doctor', function(req, res){
  let doc = Doctor({
    name: req.body.doctorName,
    phone: req.body.doctorPhone,
    medtype: req.body.medtype
  })

  doc.save(res.render("success"));
})

const memberSchema = new mongoose.Schema({
  name: String,
  password: String,
  phone: Number,
  age: Number
})

const Member = mongoose.model("member", memberSchema)

app.get('/member', function(req, res){
    res.render("member")
})

app.post('/member', function(req, res){
      let memb = Member({
        name: req.body.patientName,
        password: req.body.patientPassword,
        phone: req.body.patientPhone,
        age: req.body.age
      })

      memb.save(res.render("success"))
})

app.listen(3000, function(err){
  console.log("The server is listening")
})
