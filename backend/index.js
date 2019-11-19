var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
const mongo = require('mongodb').MongoClient
app.set("view engine", "ejs");
const CONNECTION_URL =
    "mongodb+srv://root:root@cluster0-1enyv.mongodb.net/test?retryWrites=true&w=majority";
//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Origin",
        "http://localhost:3000"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Cache-Control", "no-cache");
    next();
});
// mongoose.set("useCreateIndex", true);
// mongoose.set("useUnifiedTopology", true); //issue with a depricated- found it
// mongoose.set("poolSize", 10);
// mongoose
//     .connect(CONNECTION_URL, { useNewUrlParser: true, poolSize: 10 })
//     .then(() => console.log("Connected Successfully to MongoDB"))
//     .catch(err => console.error(err));
let Vendors = "";
let Users = "";
let rfid_tags = "";

mongo.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        console.error(err)
        return
    } else {
        console.log("Connected to mongodb");
        const db = client.db('Eventify');
        Vendors = db.collection('Vendors');
        Users = db.collection('Users');
        rfid_tags = db.collection('rfid_tags');
    }
});


app.listen(3050, err => {
    if (err) console.error(err);
    console.log("Server Listening on port 3050");
});
app.get("/", async function (req, res) {
    let vendorData = [];
    let rfidData = [];
    let userData = []
    console.log("working");
    res.send("test success");
    let ven = await Vendors.find().toArray().then(data => {
        vendorData = data;
    });
    let rfid = await rfid_tags.find().toArray().then(data => {
        rfidData = data;
    });
    let user = await Users.find().toArray().then(data => {
        userData = data;
    });
    console.log("vendorData", vendorData);
    console.log("rfidData", rfidData);
    console.log("userData", userData);

    // rfid_tags.find({}, { id: 1, _id: 0, time: 0, reader: 0 }).toArray((err, items) => {
    //     console.log(items)
    // })
});