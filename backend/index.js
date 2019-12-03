var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
app.set("view engine", "ejs");
const Report = require("./ReportSchema");
const CONNECTION_URL =
    "mongodb+srv://root:root@cluster0-1enyv.mongodb.net/Eventify?retryWrites=true&w=majority";
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
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true); //issue with a depricated- found it
mongoose.set("poolSize", 10);
mongoose
    .connect(CONNECTION_URL, { useNewUrlParser: true, poolSize: 10 })
    .then(() => console.log("Connected Successfully to MongoDB"))
    .catch(err => console.error(err));
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
        Vendors = db.collection('vendors');
        Users = db.collection('Users');
        rfid_tags = db.collection('rfid_tags');
    }
});


app.listen(3050, err => {
    if (err) console.error(err);
    console.log("Server Listening on port 3050");
});
app.get("/createreport", async function (req, res) {
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
    const rfidDa = await rfid_tags.find();
    const cursor = await Vendors.find();
    let document, newVendor;
    // const db1 = client.db('Eventify');
    // let result123 = await rfid_tags.aggregate(
    //     { $match: { "reader": readerNum } },
    //     {
    //         $group: {
    //             _id: "$id", "total_time": { $sum: "$timeDifference" }
    //         }
    //     },

    // );
    // console.log("result123", result123);
    while ((document = await cursor.next())) {
        let readerNum = document.rfid_reader_id;
        let organizer_id = document.organizer_id;
        let company_name = document.company_name;
        if (readerNum !== null && readerNum !== "" && readerNum !== undefined) {
            newVendor = new Report({ vendor_id: readerNum, organizer_id: organizer_id, company_name: company_name });
            newVendor.save().then(async vendor => {
                const custCursor = await Users.find();
                let custDocument;
                while ((custDocument = await custCursor.next())) {
                    let cardNum = custDocument.card_id;
                    console.log(cardNum);
                    let rfidCursor = await rfid_tags.find({ 'id': cardNum, 'reader': readerNum });
                    let rfidDocument;
                    let sum = 0;
                    while ((rfidDocument = await rfidCursor.next())) {
                        let diff = rfidDocument.timeDifference;
                        sum += diff;

                    }
                    console.log("sum :", sum);
                    if (sum > 0) {
                        Report.findOneAndUpdate(
                            { 'vendor_id': readerNum },
                            {
                                $push: {
                                    visitors: { card_number: cardNum, total_time: sum }
                                }
                            }
                        ).then(re => console.log(JSON.stringify(re)));
                    }
                }
            }).catch(err => {
                console.log("Error", err);
            });
            // console.log("jhjjhh");
        }

    }
});